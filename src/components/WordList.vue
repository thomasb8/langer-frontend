<template>
  <div class="word-list-container">
    <SearchInput :input-value="inputValue"
                 @click="results.length > 0 ? openDropdown() : null"
                 @onChange="inputValue = $event">
    </SearchInput>
    <ul class="word-list-dropdown" v-show="dropdownOpen">
      <li v-for="(result, index) of results" v-bind:key="index" @click="selectWord(result)">
        <div>
          <b>{{ result.word }}</b>
        </div>
        <span>{{ result.senses[0].meaning ?? '' }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { Word } from "@/word/Word";
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import { debounce } from "@/common/utilities";
import SearchInput from "@/components/SearchInput/SearchInput.vue";

export default defineComponent({
  components: { SearchInput },
  setup() {
    const { wordService } = inject(CONTEXT) as AppContext;
    return { wordService: wordService };
  },
  data() {
    return {
      inputValue: '',
      results: [] as Word[],
      dropdownOpen: false,
    }
  },
  methods: {
    getWords: async function(word: string) {
      this.results = await this.wordService.getWords(word);
      if (this.results.length) {
        this.openDropdown();
      }
    },
    selectWord(word: Word) {
      this.dropdownOpen = false;
      this.$emit('wordSelect', { word: word.word, id: word.id });
    },
    openDropdown() {
      this.dropdownOpen = true;
    },
    dropdownListener(event: MouseEvent) {
      if ((event.target as HTMLElement).closest('.input-container') === null) {
        this.dropdownOpen = false;
      }
    },
    getDebouncedWords: debounce(function(this: any, value: string) { this.getWords(value) }, 200)
  },
  watch: {
    inputValue(newVal) {
      this.getDebouncedWords(newVal);
    }
  },
  created() {
    window.addEventListener('click', this.dropdownListener);
  },
  beforeUnmount() {
    window.removeEventListener('click', this.dropdownListener);
  }
})
</script>

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
