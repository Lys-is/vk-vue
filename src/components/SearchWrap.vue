<script setup>
import SearchInput from './SearchInput.vue';
import User from './User.vue';
</script>

<template>
    <div class="search wrap">
        <h2>Поиск</h2>
        <SearchInput v-on:search="searchVk" />
        <div class="users-list">
            <transition-group name="list-complete">
                <User v-for="user in users" :key="user.id" :user="user" :btn="true"/>
            </transition-group>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            users: []
        }
    },
    methods: {

        async searchVk(searchString) {
           
            if(!searchString) {
                this.users = [];
                return
            }

            VK.Api.call('users.search', {q: searchString, count: 10, fields: "photo_50", v:"5.199"}, (r) =>{
                console.log(r);
                if(r.response?.items) {
                    this.users = r.response.items
                    
                }
            });
            VK.Api.call('users.get', {user_ids: searchString, fields: "photo_50", v:"5.199"}, (r) =>{
                console.log(r);
                if(r.response && r.response[0]) {
                    this.users.unshift(r.response[0])
                }
            });

        }
    }
}
</script>

<style scoped>
.search {
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: height 300ms ease;
}



.list-complete-move {
    transition: all 300ms ease;
}
.list-complete-enter-active, .list-complete-leave-active {
  transition: all 300ms ease;
  opacity: 0;
  transform: translateX(30px);
  
}
.list-complete-enter, .list-complete-leave-to {
  transform: translateX(-30px);
    opacity: 0;
}

</style>