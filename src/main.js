import { createApp } from 'vue'
import vueDebounce from 'vue-debounce'
import './style.css'
import App from './App.vue'
import store from './store'


createApp(App)
.use(store)
.directive('debounce', vueDebounce({ lock: true, cancelonempty: true }))
.mount('#app')