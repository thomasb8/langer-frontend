<template>
  <div>
    <input type="text" placeholder="Email" v-model="email"/>
    <input type="password" placeholder="Password" v-model="password" />
    <input type="password" placeholder="Repeat password" v-model="repeatPassword" />
    <span v-if="errMessage">{{ errMessage }}</span>
    <button @click="register()">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { CONTEXT } from "@/common/keys";
import type { AppContext } from "@/common/Context";

export default defineComponent({
  setup() {
    const { authService } = inject(CONTEXT) as AppContext;
    return { authService: authService };
  },
  data() {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      errMessage: ''
    }
  },
  methods: {
    register() {
      if (this.password === this.repeatPassword) {
        const user = this.authService.register(this.email, this.password);
        this.$emit('success', user);
      } else {
        this.errMessage = 'The password fields do not match!'
      }
    }
  }
})
</script>

<style scoped lang="scss">

</style>
