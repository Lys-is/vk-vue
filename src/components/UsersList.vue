<script setup>
import User from './User.vue';
</script>
<template>
    <div class="wrap">
        <h2>Исходный список</h2>
        <div class="users-list">
            <transition-group name="list">
                <User v-for="user in users" :key="user.id" :user="user" :btn="false"/>
            </transition-group>
        </div>

        <button @click="buildFriendList">Построить</button>
    </div>
</template>

<script>
import User from './User.vue';

export default {
    methods: {
        async buildFriendList() {
           // this.$router.push('user/24');
        
            
            this.$store.commit('users/clearFriends');

            let friends = await Promise.all(await this.users.map(async (user) => {
                await VK.Api.call('friends.get', {user_id: user.id, fields: "bdate,photo_50,sex", v:"5.199"}, (r) =>{
                    console.log(r);
                    if(r.response?.items) {          
                        r.response.items.forEach((friend) => {
                            friend.with = [user.id]
                            let obj =  {
                                id: user.id,
                                friend: friend
                            }
                            this.$store.commit('users/addFriend', obj);
                            return friend
                        });
                        
                    }
                    
                });
            }));
            console.log(friends);
            console.log(this.$store.getters['users/getAllfriends']);
        }
    },
    computed: {
        users() {
            return this.$store.getters['users/getUsers'];
        }
    }
}
</script>

<style scoped>

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
div {
    display: flex;
    flex-direction: column;
}
ul {
    list-style: none;
    padding: 0;
}
button {
    margin-top: 10px;
}
</style>