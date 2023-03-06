<script setup lang="ts">
import type { Word } from "@/word/Word";
import { inject, reactive, watch, onMounted, onBeforeUnmount } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import { debounce } from "@/common/utilities";
import SearchInput from "@/components/SearchInput/SearchInput.vue";

const { wordService } = inject(CONTEXT) as AppContext;
const data = reactive({
  inputValue: '',
  results: [] as Word[],
  dropdownOpen: false,
});

const emit = defineEmits(['wordSelect']);

watch(() => data.inputValue, (val) => getDebouncedWords(val));

onMounted(() => {
  window.addEventListener('click', dropdownListener);
});

onBeforeUnmount(() => {
  window.removeEventListener('click', dropdownListener);
})

async function getWords(word: string) {
  data.results = await wordService.getWords(word);
  if (data.results.length) {
    openDropdown();
  }
}
function selectWord(word: Word) {
  data.dropdownOpen = false;
  emit('wordSelect', { word: word.word, id: word.id });
}
function openDropdown() {
  data.dropdownOpen = true;
}
function dropdownListener(event: MouseEvent) {
  if ((event.target as HTMLElement).closest('.input-container') === null) {
    data.dropdownOpen = false;
  }
}
const getDebouncedWords = (val: string) => debounce(getWords, 200)(val);

</script>

<template>
  <div class="word-list-container">
    <SearchInput :input-value="data.inputValue"
                 @click="data.results.length > 0 ? openDropdown() : null"
                 @onChange="data.inputValue = $event">
    </SearchInput>
    <ul class="word-list-dropdown" v-show="data.dropdownOpen">
      <li v-for="(result, index) of data.results" v-bind:key="index" @click="selectWord(result)">
        <div>
          <b>{{ result.word }}</b>
        </div>
        <span>{{ result.senses[0].meaning ?? '' }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
  .word-list-container {
    ul {
      position: absolute;
      top: 42px;
      z-index: 1;
      background: white;
      color: var(--color-text-dark);
      border-radius: 8px;
      max-height: 80vh;
      overflow: scroll;
      li {
        border-bottom: 1px solid var(--langer-color-black);
        padding: 13px;
        display: flex;
        align-items: center;
        b {
          margin-right: 10px;
          white-space: nowrap;
          min-width: fit-content;
        }
        span {
          font-size: .9rem;
          line-height: 1.2rem;
          white-space: break-spaces;
        }
        &:hover {
          cursor: pointer;
          background: #d9d9d9;
        }
      }
    }
  }
</style>
