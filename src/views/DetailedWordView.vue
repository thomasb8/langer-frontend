<template>
  <div class="word-details">
    <b v-if="detailedWord.gender">{{ detailedWord.getGenderWord() }}</b>
    <span>&nbsp;{{ detailedWord.word }}&nbsp;</span>
    <i v-if="detailedWord.plural">(pl: {{ detailedWord.plural }})</i>
    <div v-if="detailedWord.formOf">
      Form of:
      <RouterLink v-for="relatedWord in detailedWord.formOf"
                  :key="relatedWord.id"
                  :to="{ name: 'detailed-word', params: { word: relatedWord.word, id: relatedWord.id } }">{{ relatedWord.word }}</RouterLink>
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
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import type { Word } from "@/word/Word";
import NounTable from "@/components/NounTable.vue";
import VerbTable from "@/components/VerbTable.vue";

export default defineComponent({
  components: { VerbTable, NounTable },
  setup() {
    const { wordService } = inject(CONTEXT) as AppContext;
    return { wordService: wordService };
  },
  data() {
    return {
      word: this.$route.params.word,
      wordId: this.$route.params.id as string,
      detailedWord: {} as Word
    }
  },
  methods: {
    async getWordData() {
      this.detailedWord = await this.wordService.getDetailedWord(this.wordId);
    }
  },
  created() {
    if (this.word && this.wordId) {
      this.getWordData();
    }
    this.$watch(() => this.$route.params,
  (toParams: any) => {
        this.word = toParams.word;
        this.wordId = toParams.id;
        this.getWordData();
    })
  }
})
</script>

<style scoped lang="scss">
  .gloss {
    border: 1px solid rgba(255, 0, 0, 0.4);
  }
  .word-details {
  }
</style>
