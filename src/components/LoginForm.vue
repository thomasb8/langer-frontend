<script setup lang="ts">
import type { AppContext } from "@/common/Context";
import { CONTEXT } from "@/common/keys";
import { store } from "@/common/store";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const { authService } = inject(CONTEXT) as AppContext;
const email = ref('');
const password = ref('');
const router = useRouter();

async function login() {
  const user = await authService.login(email.value, password.value);
  store.setUser(user);
  router.push('/');
}

</script>

<template>
  <form @submit.prevent="login()">
    <input type="text" placeholder="Email" v-model="email"/>
    <input type="password" placeholder="Password" v-model="password"/>
    <button type="submit" placeholder="Repeat password">Login</button>
  </form>
</template>

<style scoped lang="scss">

</style>
