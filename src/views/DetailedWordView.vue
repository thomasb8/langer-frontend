<script setup lang="ts">
import { onMounted, inject, ref, watch } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import type { Word } from "@/word/Word";
import NounTable from "@/components/NounTable.vue";
import VerbTable from "@/components/VerbTable.vue";
import { store } from "@/common/store";
import { useRoute } from "vue-router";

const { wordService, wordSessionService } = inject(CONTEXT) as AppContext;
const route = useRoute();
const word = ref<string>(route.params.word as string);
const detailedWords = ref<Word[]>([]);

async function getWordData() {
  detailedWords.value = await wordService.getDetailedWords(word.value);
}

async function addWordToExistingSession(word: string) {
  if (store.isUserLoggedIn() && store.latestSession() && !store.latestSessionHasWord(word)) {
    await wordSessionService.addWord(store.latestSession()!.id, word);
    const updated = await wordSessionService.get(store.latestSession().id);
    store.updateSession(updated);
  }
}

onMounted(async () => {
  if (word) {
    await getWordData();
    addWordToExistingSession(detailedWords.value[0].word);
  }
  watch(() => route.params,
    async (toParams: any) => {
      word.value = toParams.word;
      await getWordData();
      addWordToExistingSession(detailedWords.value[0].word);
    })
})
</script>

<template>
  <div v-for="(detailedWord) of detailedWords">
    <div class="word-details">
      <b v-if="detailedWord.gender">{{ detailedWord.getGenderWord() }}</b>
      <span>&nbsp;{{ detailedWord.word }}&nbsp;</span>
      <i v-if="detailedWord.plural">(pl: {{ detailedWord.plural }})</i>
      <div v-if="detailedWord.formOf">
        Form of:
        <RouterLink :to="{ name: 'detailed-word', params: { word: detailedWord.formOf } }">{{ detailedWord.formOf }}
        </RouterLink>
      </div>
    </div>
    <div>
      <ul>
        <li v-for="(gloss, gi) in detailedWord.senses" :key="`g-${gi}`" class="gloss">
          <b>{{ gloss.meaning }}</b>
          <div v-show="gloss.examples.length">
            Examples
            <div v-for="(example, ei) in gloss.examples" :key="`e-${ei}`" class="example">
              <div>{{ example.text }}</div>
              <div>{{ example.translation }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="detailedWord.position === 'noun'">
      <NounTable :word="detailedWord"></NounTable>
    </div>
    <div v-if="detailedWord.position === 'verb'">
      <VerbTable :word="detailedWord"></VerbTable>
    </div>
  </div>
</template>

<style scoped lang="scss">
.gloss {
  border: 1px solid rgba(255, 0, 0, 0.4);
}
</style>
