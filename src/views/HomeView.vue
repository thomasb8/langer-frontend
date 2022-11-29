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
import type User from "@/user/User";
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
  created() {
    this.setUserSessions(this.store.user);
    this.$watch(() => this.store.user, this.setUserSessions)
  },
  methods: {
    setUserSessions(user: User | null) {
      if (user) {
        this.fetchSessions();
      } else {
        store.wordSessions = [];
      }
    },
    async fetchSessions() {
      let sessions = await this.wordSessionService.list();
      if (!sessions[0] || sessions[0].isOlderThanOneDay()) {
        const session = await this.wordSessionService.create();
        sessions.unshift(session);
      }
      store.wordSessions = sessions;
    }
  }
})
</script>

<style scoped lang="scss">

</style>
