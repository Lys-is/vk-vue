<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { RouterView } from 'vue-router';

const store = useStore();
const isAuth = () => {
  VK.Auth.getLoginStatus((response) => {
  console.log(response)
  if(response.status == 'connected')
    return true
  else
    return false
})}

</script>

<template>
  <div>
    <RouterView />
    <div id="vk_api_transport"></div>
  </div>
</template>

<script>
  export default {
    mounted() {
      window.vkAsyncInit = function() {
          VK.init({
              apiId: 52967408
          });
      };
      setTimeout(function() {
          var el = document.createElement("script");
          el.type = "text/javascript";
          el.src = "https://vk.com/js/api/openapi.js?169";
          el.async = true;
          document.getElementById("vk_api_transport").appendChild(el);
      }, 0);
    }
  }

</script>

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
