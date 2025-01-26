<script setup>
import * as VKID  from '@vkid/sdk';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

</script>

<template>
    <div>
        <button class="vkid-button" @click="login">
            <img src="/vk.png" alt="VK ID" class="vkid-logo" />
            Войти с VK ID
        </button>
    </div>
</template>

<script>
    export default {
        methods: {
            async login() {
                await this.VKID.Auth.login();
                console.log();
                console.log(response);
                //store.commit('setToken', response.accessToken);
            },
        },
        name: 'Oauth',
        computed: {
            VKID() {
                VKID.Config.init({
                    app: 52967408,
                    redirectUrl: 'https://lys-is.github.io/vk-vue/',
                    scope: '',
                    mode: VKID.ConfigAuthMode.Redirect,
                });
                return VKID;
            },
        },
        created() {
            let params = new URLSearchParams(window.location.search);
            console.log(params)
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