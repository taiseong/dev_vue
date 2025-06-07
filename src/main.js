import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import 'bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/assets/css/main.css'   // <-- 전역 스타일 import

//import '@/assets/css/bootstrap.min.css'

//import '@/assets/js/plugin/webfont/webfont.min.js'

//import '@/assets/css/plugins.css'
//import '@/assets/css/kaiadmin.min.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App).use(pinia).use(router).mount('#app')
