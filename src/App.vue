<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from "@/components/HeaderComponent.vue";
</script>

<template>
  <Header></Header>
  <div class="container">
    <aside class="sidebar"></aside>
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
