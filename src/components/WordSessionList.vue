<template>
  <div>
    <div v-for="(session) of store.wordSessions" :key="session.id">
      {{ session.getFormattedCreationDate() }}
      <div v-for="(entry) of session.entries" :key="entry.wordId">
        <b>{{ entry.word.word }}</b>
        <div v-for="(meaning, i) of entry.word.getMeanings()" :key="`meaning-${i}`">
          {{ meaning }}
        </div>
        <button @click="removeEntry(session.id, entry.wordId)">X</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { store } from "@/common/store";
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";

export default defineComponent({
  setup() {
    const { wordSessionService } = inject(CONTEXT) as AppContext;
    return { wordSessionService: wordSessionService };
  },
  data() {
    return {
      store
    }
  },
  methods: {
    async removeEntry(sessionId: string, wordId: string) {
      await this.wordSessionService.removeWord(sessionId, wordId);
      const session = await this.wordSessionService.get(sessionId);
      store.updateLatestSession(session);
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
