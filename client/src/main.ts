import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import 'vfonts/FiraCode.css'
import router from "./router";
import 'element-plus/theme-chalk/dark/css-vars.css'
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
