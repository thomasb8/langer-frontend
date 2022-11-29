<script lang="ts">
import WordList from "@/components/WordList.vue";
import { store } from "@/common/store";
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";

export default defineComponent({
  setup() {
    const { authService } = inject(CONTEXT) as AppContext;
    return { authService: authService };
  },
  components: { WordList },
  data() {
    return {
      store
    }
  },
  methods: {
    logout() {
      store.setUser(null);
      this.authService.logout();
      this.$router.push('/');
    },
    async onWordSelect(event: { word: string, id: string }) {
      this.$router.push(`/word/${event.word}/${event.id}`)
    }
  }
});
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
