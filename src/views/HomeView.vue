<template>
  <div v-if="store.user">
    {{ store.user.email }}
  </div>
  <div v-else>
    Please log in if you want to create word sessions.
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { store } from "@/common/store";
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
  }
})
</script>

<style scoped lang="scss">

</style>
