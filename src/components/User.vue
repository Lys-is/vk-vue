<script setup>
import { defineProps } from 'vue';

const props = defineProps(['user', 'btn']);
</script>

<template>
    <div class="user-item" >
        <img :src="user.photo_50" :alt="user.first_name" class="user-photo" />
        <p>{{ user.first_name }} {{ user.last_name }}</p>
        <button v-if="btn" @click="addUser">Добавить в список</button>
    </div>
</template>
<script>
export default {
    methods: {
        addUser() {
            console.log(this.user);
            this.$store.commit('users/addUser', this.user);
        }
    }
}
</script>
<style scoped>
.user-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: -webkit-fill-available;
    column-gap: 10px;
    background: #474646;
    border-radius: 4px;
    padding: 6px 21px;
    justify-content: space-between;

}
p {
    margin: 0;
    padding: 0;
}
button {
    background-color: #4680C2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
    align-self:center
}
button:hover {
    background-color: #3571A3;
}

</style>