<script setup>
import * as VKID from '@vkid/sdk';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
    VKID.Config.init({
        app: 52961055,
        redirectUrl: 'https://oauth.vk.com/blank.html',
    });
});
</script>

<template>
    <div>
        <button class="vkid-button" @click="VKID.Auth.login()">
            <img src="/vk.png" alt="VK ID" class="vkid-logo" />
            Войти с VK ID
        </button>
    </div>
</template>
<script>
export default {
    methods: {
        async login() {
            let resp = await VKID.Auth.login();
        }
    },
    name: 'Oauth'
}
</script>
<style scoped>
.vkid-button {
    display: flex;
    align-items: center;
    background-color: #0077FF;
    color: white;   
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
}

.vkid-logo {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
</style>