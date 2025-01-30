<script setup>
import SearchWrap from '@/components/SearchWrap.vue';
import Oauth from '@/components/Oauth.vue';
import UsersList from '@/components/UsersList.vue';
import FriendsList from '@/components/FriendsList.vue';
import { computed } from 'vue';

// const isAuth = computed(() => {

//   VK.Auth.getLoginStatus((response) => {
//   console.log(response)
//   if(response.status == "connected"){
//     console.log('connected')
//     return true 
//   }
//   else
//     return false
//   })
// })

</script>
<template>
    <div id="wrapper" @click="console.log(check, isAuth, vkReady)">
        <div class="authorized" v-if="check">
            <SearchWrap/>
            <UsersList/>
            <FriendsList />
        </div>
        <Oauth v-else/>
      </div>
</template>
<script>
export default {
    data() {
        return {
            vkAuth: false,
            vkReady: false, 
            checkingInterval: null,
        }
    },
    created() {
        console.log('created')
        let localThis = this 
        this.checkingInterval = setInterval(function(){
        if (window.VK) {
            localThis.vkReady = true
        }
        }, 100)
    },
    methods: {
        isAuth() {
            VK.Auth.getLoginStatus((response) => {
            console.log(response)
            if(response.status == "connected"){
                console.log('connected')
                this.vkAuth = true 
            }
            else
                this.vkAuth = false
            })
        }
    },
    computed: {
        
        check() {
           // console.log(this.vkReady, this.isAuth)
            return this.vkReady && this.vkAuth
        }
    },
    watch: {
        vkReady: function(data) {
            if (data) { 
                clearInterval(this.checkingInterval) 
                this.isAuth()
                console.log(this.vkReady)
            }
        }
        }
}
</script>
<style scoped>
.authorized {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 1em;
  }
  </style>