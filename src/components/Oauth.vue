<script setup>
import * as VKID  from '@vkid/sdk';

</script>

<template>
    <div>
        <button class="vkid-button" @click="login">
            <img src="/vk.png" alt="VK ID" class="vkid-logo" />
            Войти с VK ID
        </button>
        <span id="result" v-if="!cookie3d">Ваш браузер не поддерживает 3rd party cookies</span>
        <iframe src="https://mindmup.github.io/3rdpartycookiecheck/start.html" style="display:none" />
    </div>
</template>

<script>
    export default {
        methods: {
            async login() {
                await VK.Auth.login((response) => {
                    console.log(response);
                    location.reload()
                })
            },
        },
        name: 'Oauth',
        data() {
            return {
                cookie3d: true
            }
        },
        async mounted() {
            const receiveMessage = (evt) => {
                if (evt.data === 'MM:3PCunsupported') {
                    this.cookie3d = false
                } else if (evt.data === 'MM:3PCsupported') {
                    this.cookie3d = true
                }
            };
            window.addEventListener("message", receiveMessage, false);
        },
    };
    
</script>

<style scoped>
.vkid-button {
    display: flex;
    align-items: center;
    background-color: #4680C2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.vkid-button:hover {
    background-color: #3571A3;
}

.vkid-logo {
    width: 24px;
    height: 24px;
    margin-right: 10px;
}
</style>