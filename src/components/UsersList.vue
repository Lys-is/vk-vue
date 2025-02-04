<script setup>
import User from './User.vue';
</script>
<template>
    <div class="wrap">
        <h2 @click="test">Исходный список</h2>
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
    data() {
        return {
            friendsArr: [],
            iter: 0
        }
    },
    methods: {
        async test() {
            let users = [572221, 1338081, 2803257, 4560019, 8704427]
            const code = `
                var arr = [572221, 1338081, 2803257, 4560019, 8704427];
                var qq = [];
                var i = 0;
                while(i < 5){
                    var user = arr[i];
                    var friendsCount = API.users.get({"user_ids": arr[i], fields: "counters", v:"5.199"});
                    qq.push(friendsCount);
                    i = i + 1;
                }
                return qq;
            `;
            console.log('test', code);
            await VK.Api.call('execute', {code: code, v:"5.199"}, (r) =>{
                console.log(r);
            });
        },
        async buildFriendList() {
            
            const count = this.getCount();
            this.friendsArr = []
            this.iter = 0
            this.$store.commit('users/clearFriends');
            let friends = await Promise.all(this.users.map(async (user) => {
                await VK.Api.call('friends.get', {user_id: user.id, fields: "bdate,photo_50,sex", v:"5.199"}, (r) =>{
                    console.log(r);
                    if(r.response?.items) {          
                        r.response.items.forEach((friend, index) => {
                            friend.with = [user.id]                            
                            let obj =  {
                                id: user.id,
                                friend: friend
                            }
                            count(friend.id)
                            this.$store.commit('users/addFriend', obj);
                        });
                    }
                    return r
                });
            }));
            
            console.log(friends);
            console.log(this.$store.getters['users/getAllfriends']);
        },
        getCount() {
            console.log(this);
            let arr = []
            let iter = 0;
            return (id) => {
                arr.push(id)
                //console.log('push', arr)
                if(arr.length === 25) {
                    iter++
                    console.log(this);
                    console.log(arr);
                    let code = this.genCode(arr)
                    setTimeout(async () => {
                        VK.Api.call('execute', {code: code, v:"5.199"}, (r) => {
                            console.log(this);
                            if(r.response) {
                                r.response.forEach((user) => {
                                    if(user[0])
                                        this.setFreindsCount(user[0].id, user[0].counters?.friends || 0)
                                });
                            }
                            if(r.error?.error_code === 6) {
                                
                            }
                        });
                    }, iter * 500)
                    arr = []
                }
            }
        },
        setFreindsCount(id, count) {
            this.$store.commit('users/setFreindsCount', {id, count});
        },
        genCode(arr) {
            let code = `
                    var arr = [${arr.join(',')}];
                    var qq = [];
                    var i = 0;
                    while(i < 25){
                        var user = arr[i];
                        var friendsCount = API.users.get({"user_ids": arr[i], fields: "counters", v:"5.199"});
                        qq.push(friendsCount);
                        i = i + 1;
                    }
                    return qq;
                `;
            return code
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