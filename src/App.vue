<script setup lang="ts">
import { RouterView } from 'vue-router'
import WordList from "@/components/WordList.vue";
</script>

<template>
  <header>
    <div class="logo">
      Langer
    </div>
    <WordList @word-select="$router.push(`/word/${$event.word}/${$event.id}`)"/>
    <RouterLink to="login">Login</RouterLink>
    <RouterLink to="register">Register</RouterLink>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
  header {
    display: flex;
    height: 50px;
    justify-content: flex-start;
    align-items: center;
    padding: 0 2rem;
    .logo {
      margin-right: 2rem;
    }
  }

</style>
