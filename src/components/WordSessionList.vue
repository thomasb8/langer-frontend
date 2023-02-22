<script setup lang="ts">
import { store } from "@/common/store";
import { inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";

const { wordSessionService } = inject(CONTEXT) as AppContext;

async function removeEntry(sessionId: string, word: string) {
  await wordSessionService.removeWord(sessionId, word);
  const session = await wordSessionService.get(sessionId);
  store.updateSession(session);
}

async function createSession() {
  const session = await wordSessionService.create();
  store.addSession(session);
}

</script>

<template>
  <div>
    <button v-if="store.isUserLoggedIn()" type="button" @click="createSession()">+</button>
    <div v-for="(session) of store.wordSessions" :key="session.id">
      {{ session.getFormattedCreationDate() }}
      <div v-for="(entry) of session.entries" :key="entry.word">
        <RouterLink :to="{ name: 'detailed-word', params: { word: entry.word } }"><b>{{ entry.word }}</b></RouterLink>
        <button @click="removeEntry(session.id, entry.word)">X</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
