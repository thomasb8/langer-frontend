<template>
  <table>
    <tr>
      <th>Person</th>
      <th>Indicative present</th>
      <th>Präteritum</th>
      <th>Perfekt</th>
    </tr>
    <tbody>
    <tr v-for="(word, index) in getTableWord()" :key="word + '-' + index">
      <td>{{ getPersonByIndex(index) }}</td>
      <td>{{ word[0] }}</td>
      <td>{{ word[1] }}</td>
      <td>{{ word[2] }}</td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Conjugation } from "@/word/Word";
import { Word } from "@/word/Word";
import { PERSONS, WordTags } from "@/word/WordTags";

export default defineComponent({
  props: {
    word: {
      type: Word,
      required: true
    }
  },
  computed: {
    tableData() {
      return this.getTableWord();
    }
  },
  methods: {
    getTableWord() {
      if (!this.word) return;
      const indicative = this.word.conjugations.filter(it => it.tags.includes(WordTags.INDICATIVE));
      const present = indicative.filter(it => it.tags.includes(WordTags.PRESENT));
      const normal = present.filter(it => !it.tags.includes(WordTags.SUBORDINATE));
      const prateritum = indicative.filter(it => it.tags.includes(WordTags.PRATERITUM));
      const perfect = indicative.filter(it => it.tags.includes(WordTags.PERFECT));
      return [
        this.getFormsByNumberAndPersonForForm(normal),
        this.getFormsByNumberAndPersonForForm(prateritum),
        this.getFormsByNumberAndPersonForForm(perfect)
      ].reduce((acc, arr) => {
        arr.forEach((c, i) => acc[i] = acc[i] ? [...acc[i], c] : [c]);
        return acc;
      }, [] as string[][]);
    },
    getPersonByIndex(index: number) {
      return ['ich', 'du', 'er, sie es', 'wir', 'ihr', 'sie'][index];
    },
    getFormsByNumberAndPersonForForm(forms: Conjugation[]) {
      const personValues: Record<string, number> = {
        [WordTags.FIRST_PERSON]: 0,
        [WordTags.SECOND_PERSON]: 1,
        [WordTags.THIRD_PERSON]: 2,
      }
      const splitByNumber = (words: Conjugation[]) =>
          words.reduce((acc, it) => {
            if (it.tags.includes(WordTags.SINGULAR)) {
              acc[0].push(it);
            } else if (it.tags.includes(WordTags.PLURAL)) {
              acc[1].push(it);
            }
            return acc;
          }, [[], []] as Conjugation[][])
      const getPersonValue = (word: Conjugation) => {
        return personValues[getPersonOfWord(word)];
      }
      const getPersonOfWord = (word: Conjugation) => word.tags.find(it => PERSONS.includes(it)) || -1;
      const groupByPerson = (arr: Conjugation[]) => {
        return arr.reduce((acc, it) => {
          if (acc[getPersonValue(it)]) {
            acc[getPersonValue(it)] += ', ';
          }
          acc[getPersonValue(it)] += it.form;
          return acc;
        }, ['', '', ''] as string[])
      }
      const [singular, plural] = splitByNumber(forms);
      const res = [...groupByPerson(singular), ...groupByPerson(plural)];
      return res;
    }
  }
})
</script>

<style scoped lang="scss">
td {
  padding: 1rem;
  border: 1px solid rgba(255, 0, 0, 0.4);
}
</style>
