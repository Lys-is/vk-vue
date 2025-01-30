<script setup>
import { defineProps } from 'vue';

const props = defineProps(['friend']);
</script>

<template>
    <div class="friend" @click="goToUser">
        <img :src="friend.photo_50" :alt="friend.first_name" class="user-photo" />
        <p>{{ friend.first_name }} {{ friend.last_name }}</p>
        <p>
            Др : {{ friend.bdate }} <br>
            Пол : {{ friend.sex === 1 ? 'Женщина' : 'Мужчина' }}
        </p>
    </div>
</template>
<script>
export default {
    methods: {
        goToUser() {
            this.$router.push('/user/' + this.friend.id);
        }
    }
}
</script>
<style scoped>

.friend {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 45%;
    column-gap: 10px;
    background: #474646;
    border-radius: 4px;
    padding: 6px 21px;
    justify-content: space-between;
    cursor: pointer;
}
p {
    margin: 0;
    padding: 0;
}

</style>