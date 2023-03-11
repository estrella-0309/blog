import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import 'vfonts/FiraCode.css'
const app = createApp(App)
app.use(createPinia())

app.mount('#app')
