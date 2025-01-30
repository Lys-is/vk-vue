import { createApp } from 'vue'
import vueDebounce from 'vue-debounce'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './routes'


createApp(App)
.use(store)
.use(router)
.directive('debounce', vueDebounce({ lock: true, cancelonempty: true }))
.mount('#app')