import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '/views/home.vue'
import UserView from '/views/user.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/user/:id', component: UserView },
]

const router = createRouter({
  history: createWebHistory('/vk-vue/'),
  routes,
})

export default router