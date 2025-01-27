<script setup>
import Search from './Search.vue';
import User from './User.vue';
</script>

<template>
    <div>
        <h1>Исходный</h1>
        <Search v-on:search="searchVk" />
        <User v-for="user in users" :key="user.id" :user="user" />
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
            let e = await fetch(`https://api.vk.com/method/users.search?q=${searchString}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.users = data.response.items;
                });
            
        }
    }
}
</script>