<script setup lang="ts">
import { inject, reactive } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";

const { authService } = inject(CONTEXT) as AppContext;

const data = reactive({
  email: '',
  password: '',
  repeatPassword: '',
  errMessage: '',
  success: false
});
const emit = defineEmits(['success']);

function register() {
  if (data.password === data.repeatPassword) {
    const user = authService.register(data.email, data.password);
    data.success = true;
  } else {
    data.errMessage = 'The password fields do not match!'
  }
}
</script>

<template>
  <form @submit.prevent="register()">
    <input type="text" placeholder="Email" v-model="data.email"/>
    <input type="password" placeholder="Password" v-model="data.password" />
    <input type="password" placeholder="Repeat password" v-model="data.repeatPassword" />
    <span v-if="data.errMessage">{{ data.errMessage }}</span>
    <button type="submit">Register</button>
  </form>
  <div v-if="data.success">
    You can log in <RouterLink to="/login">here</RouterLink>!
  </div>
</template>

<style scoped lang="scss">

</style>
