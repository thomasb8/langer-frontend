<template>
  <div v-for="(detailedWord) of detailedWords">
  <div class="word-details">
    <b v-if="detailedWord.gender">{{ detailedWord.getGenderWord() }}</b>
    <span>&nbsp;{{ detailedWord.word }}&nbsp;</span>
    <i v-if="detailedWord.plural">(pl: {{ detailedWord.plural }})</i>
    <div v-if="detailedWord.formOf">
      Form of:
      <RouterLink :to="{ name: 'detailed-word', params: { word: detailedWord.formOf } }">{{ detailedWord.formOf }}</RouterLink>
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

<script lang="ts">
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import type { Word } from "@/word/Word";
import NounTable from "@/components/NounTable.vue";
import VerbTable from "@/components/VerbTable.vue";
import { store } from "@/common/store";

export default defineComponent({
  components: { VerbTable, NounTable },
  setup() {
    const { wordService, wordSessionService } = inject(CONTEXT) as AppContext;
    return { wordService: wordService, wordSessionService: wordSessionService };
  },
  data() {
    return {
      word: this.$route.params.word as string,
      detailedWords: [] as Word[]
    }
  },
  methods: {
    async getWordData() {
      this.detailedWords = await this.wordService.getDetailedWords(this.word);
    },
    async addWordToExistingSession(word: string) {
      if (store.isUserLoggedIn() && store.latestSession() && !store.latestSessionHasWord(word)) {
        await this.wordSessionService.addWord(store.latestSession()!.id, word);
        const updated = await this.wordSessionService.get(store.latestSession().id);
        store.updateSession(updated);
      }
    }
  },
  async created() {
    if (this.word) {
      await this.getWordData();
      this.addWordToExistingSession(this.detailedWords[0].word);
    }
    this.$watch(() => this.$route.params,
  async (toParams: any) => {
        this.word = toParams.word;
        await this.getWordData();
        this.addWordToExistingSession(this.detailedWords[0].word);
    })
  }
})
</script>

<style scoped lang="scss">
  .gloss {
    border: 1px solid rgba(255, 0, 0, 0.4);
  }
</style>
