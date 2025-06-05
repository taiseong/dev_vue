import { createApp } from 'vue'
import App from './App.vue'
import router from './router'



import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
//import '@/assets/css/bootstrap.min.css'

//import '@/assets/js/plugin/webfont/webfont.min.js'

import '@/assets/css/plugins.css'
import '@/assets/css/kaiadmin.min.css'

createApp(App).use(router).mount('#app')
