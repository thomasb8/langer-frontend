<template>
  <div>
    <input type="text" placeholder="Email" v-model="email"/>
    <input type="password" placeholder="Password" v-model="password"/>
    <button @click="login()" placeholder="Repeat password">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";
import { store } from "@/common/store";

export default defineComponent({
  setup() {
    const { authService } = inject(CONTEXT) as AppContext;
    return { authService: authService };
  },
  data() {
    return {
      email: '',
      password: '',
      store
    }
  },
  methods: {
    async login() {
      const user = await this.authService.login(this.email, this.password);
      store.setUser(user);
    }
  }
})
</script>

<style scoped lang="scss">

</style>
