<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/HeaderComponent.vue";
import { CONTEXT } from "@/common/keys";
import { inject, ref, watch } from "vue";
import type { AppContext } from "@/common/Context";
import { StorageKey } from "@/common/Storage";
import { store } from "@/common/store";
import WordSessionList from "@/components/WordSessionList.vue";
import type User from './user/User';
const { storage, authService, wordSessionService } = inject(CONTEXT) as AppContext;

const token = storage.get(StorageKey.LOGIN_ACCESS_TOKEN);
const loaded = ref(false);
(async function setup() {
  if (token) {
    try {
      const user = await authService.getProfile(token);
      store.setUser(user);
      loaded.value = true;
      setUserSessions(user);
    } catch (e) {
      console.log(e);
      storage.remove(StorageKey.LOGIN_ACCESS_TOKEN);
      loaded.value = true;
    }
  } else {
    loaded.value = true;
  }
})();

watch(() => store.user, setUserSessions)

function setUserSessions(user: User | null) {
  if (user) {
    fetchSessions();
  } else {
    store.wordSessions = [];
  }
}

async function fetchSessions() {
  let sessions = await wordSessionService.list();
  if (!sessions.some(session => session.isNotOlderThanOneDay())) {
    const session = await wordSessionService.create();
    sessions.unshift(session);
  }
  store.wordSessions = sessions;
}


</script>

<template>
  <Header v-if="loaded"></Header>
  <div class="container">
    <aside class="sidebar">
      <WordSessionList></WordSessionList>
    </aside>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: grid;
  height: calc(100vh - 50px);
  grid-template-columns: 300px auto;

  .sidebar {
    background: var(--langer-color-grey);
    height: 100%;
  }
}
</style>
