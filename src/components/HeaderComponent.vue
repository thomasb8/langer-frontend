<script setup lang="ts">
import WordList from "@/components/WordList.vue";
</script>

<template>
  <header>
    <div class="logo">
      Langer
    </div>
    <WordList @word-select="$router.push(`/word/${$event.word}/${$event.id}`)"/>
    <div class="links">
      <RouterLink to="login">Login</RouterLink>
      <RouterLink to="register">Register</RouterLink>
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
