<script setup lang="ts">
import { Word, type Conjugation } from '@/word/Word';
import { WordTags } from '@/word/WordTags';
import { computed } from 'vue';


const { word } = defineProps({ word: { type: Word, required: true }});

const tableData = computed(() => {
  return getTableWord();
});

function getTableWord() {
  if (!word) return;
  const dative = getSingularAndPluralForCase(word.conjugations, WordTags.DATIVE);
  const accusative = getSingularAndPluralForCase(word.conjugations, WordTags.ACCUSATIVE)
  const genitive = getSingularAndPluralForCase(word.conjugations, WordTags.GENITIVE)
  const nominative = getSingularAndPluralForCase(word.conjugations, WordTags.NOMINATIVE)
  return {
    dative, accusative, genitive, nominative
  }
}
function getSingularAndPluralForCase(conjugations: Conjugation[], wordCase: WordTags) {
  const forms = conjugations.filter(it => it.tags.includes(wordCase));
  return {
    singular: forms.filter(it => it.tags.includes(WordTags.SINGULAR)).map(it => it.form),
    plural: forms.filter(it => it.tags.includes(WordTags.PLURAL)).map(it => it.form)
  }
}
</script>

<template>
  <table v-if="tableData">
    <tr>
      <th></th>
      <th>Singular</th>
      <th>Plural</th>
    </tr>
    <tbody>
    <tr>
      <td>Nominativ</td>
      <td>{{ tableData.nominative.singular.join('/') }}</td>
      <td>{{ tableData.nominative.plural.join('/') }}</td>
    </tr>
    <tr>
      <td>Akkusativ</td>
      <td>{{ tableData.accusative.singular.join('/') }}</td>
      <td>{{ tableData.accusative.plural.join('/') }}</td>
    </tr>
    <tr>
      <td>Dativ</td>
      <td>{{ tableData.dative.singular.join('/')}}</td>
      <td>{{ tableData.dative.plural.join('/')}}</td>
    </tr>
    <tr>
      <td>Genitiv</td>
      <td>{{ tableData.genitive.singular.join('/') }}</td>
      <td>{{ tableData.genitive.plural.join('/') }}</td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
td {
  padding: 1rem;
  border: 1px solid rgba(255, 0, 0, 0.4);  }
</style>
