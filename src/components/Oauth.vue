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
        async mounted() {
            //let params = Object.fromEntries(new URLSearchParams(location.search));
            let params = {
                "code": "vk2.a.FtkxDHcIbo-oikXIY_P9VTkNpmvydURPASFCCviiQPQ9K6BxPyW7iIWKxqtojIhsgIg52h6vutFlmAwdisqIWB-i6RU_qLmMUy3j_cnQidtNiig9ufvHNfThe3sUGkJO4Yt9OqMdwxxeaxspXeRLa_DlefAtTezfLTn2KbRg5O9Xp8YyLA4uDtNJ6wRZtR7TszGuuztrHh6VJyFXjeUw3g",
                "expires_in": "600",
                "device_id": "VBQFJs3kVTJozlikyjgqfsE4GrGUFDwrFporPKIh1rH-gxbQl7bkAYOk8Jz5ew8r97iHKf8PHc4FDDTyinQw4g",
                "state": "M8mbC4QHkVkgJGXFLVVXRxfGVeFVTJ8kJX0YRoLHaRcAiBSx",
                "ext_id": "JYrw0bcCUU99tcM2Yr4Db_LzkpfneeOAoWA7Fd7fVK37_gzAoXRNpHh4i2i-63voxItB6PhTYJpSBhRqAgxTm5pDUuEBfG-iby973h8KJsPCE0qB1Xd1dY50Euv37X5lg7d0vxnur_Czu_8RyDFKI6GyfdF_SjOL3N847i2xcf2xpXc",
                "type": "code_v2"
            };
            if(params.code && params.device_id) {
                let response = await this.VKID.Auth.exchangeCode(params.code, params.device_id)
                console.log(response)
            }
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