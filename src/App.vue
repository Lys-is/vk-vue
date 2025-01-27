<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import UsersList from './components/UsersList.vue';
import Oauth from './components/Oauth.vue';

const store = useStore();
const hasToken = computed(() => store.state.auth.token !== null);
</script>

<template>
  <div>
    <UsersList v-if="hasToken" />
    <Oauth v-else />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
