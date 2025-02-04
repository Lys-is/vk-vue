<script setup>
import { defineProps } from 'vue';

const props = defineProps(['friend', 'usersCount']);
</script>

<template>
    <div class="friend" @click="goToUser" :style="{backdropFilter: 'brightness(' + brightness + '%)'}">
        <img :src="friend.photo_50" :alt="friend.first_name" class="user-photo" />
        <p>{{ friend.first_name }} {{ friend.last_name }}</p>
        <p>
            Кол-во друзей : {{ friend.friendsCount || '~' }} <br>

            Др : {{ friend.bdate }} <br>
            Пол : {{ friend.sex === 1 ? 'Женщина' : 'Мужчина' }}
        </p>
    </div>
</template>
<script>
export default {
    props: ['friend', 'usersCount'],
    methods: {
        goToUser() {
            this.$router.push('/user/' + this.friend.id);
        }

    },
    computed: {
        brightness() {
            let brightness = (100 / this.$props.usersCount * this.$props.friend.with.length) * 2 + 100
            return brightness
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
    background: rgb(71 70 70 / 30%);
    border-radius: 4px;
    padding: 6px 21px;
    justify-content: space-between;
    cursor: pointer;
}
p {
    margin: 0;
    padding: 0;
}
@media screen and (max-width: 1024px) {
    .friend {
        width: 100%;
    }
    
}
</style>