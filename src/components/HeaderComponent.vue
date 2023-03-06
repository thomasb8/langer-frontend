<script setup lang="ts">
import WordList from "@/components/WordList.vue";
import { store } from "@/common/store";
import { inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import { useRouter } from "vue-router";

const { authService } = inject(CONTEXT) as AppContext;
const router = useRouter();

function logout() {
  store.setUser(null);
  authService.logout();
  router.push('/');
}

async function onWordSelect(event: { word: string, id: string }) {
  router.push(`/word/${event.word}`)
}
</script>

<template>
  <header>
    <div class="logo">
      Langer
    </div>
    <WordList @word-select="onWordSelect($event)"/>
    <div class="links">
      <RouterLink v-if="!store.isUserLoggedIn()" to="/login">Login</RouterLink>
      <RouterLink v-if="!store.isUserLoggedIn()" to="/register">Register</RouterLink>
      <div v-if="store.isUserLoggedIn()">
        {{ store.user && store.user.email }}
        <button @click="logout()">Logout</button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
  header {
    display: grid;
    grid-template-columns: 300px 1fr 1fr;
    height: 50px;
    justify-content: flex-start;
    align-items: center;
    padding: 0 2rem;
    background: var(--langer-color-red);
    .logo {
      font-weight: bold;
      font-size: 1.5rem;
    }
    .links {
      display: flex;
      justify-content: flex-end;
    }
  }
</style>
