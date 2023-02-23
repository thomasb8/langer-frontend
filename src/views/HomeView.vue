<script setup lang="ts">
import { inject } from "vue";
import { store } from "@/common/store";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";

const { wordSessionService } = inject(CONTEXT) as AppContext;
</script>

<template>
  <div v-if="store.user">
    {{ store.user.email }}
  </div>
  <div v-else>
    Please log in if you want to create word sessions.
  </div>
</template>

<style scoped lang="scss">

</style>
