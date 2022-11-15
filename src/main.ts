import { createApp } from 'vue'
import App from './App.vue'
import router from './router'


import './assets/reset.css'
import './assets/main.css'
import createContext from "@/common/Context";
import { CONTEXT } from "@/common/keys";

const app = createApp(App)

app.provide(CONTEXT, createContext());

app.use(router)

app.mount('#app')
