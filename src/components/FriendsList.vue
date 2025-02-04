<script setup>
import Friend from "./Friend.vue"
</script>
<template>
    <div class="friends">
        <h2>Друзья</h2>
        <div class="friends-list">
            <transition-group name="list-complete">
                <Friend v-for="friend in friends" :key="friend.id" :usersCount="usersCount" :friend="friend"/>
            </transition-group>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
    },
    computed: {
        friends() {
            return this.$store.getters['users/getAllfriends'];
        },
        usersCount() {
            return this.$store.getters['users/getUsersCount'];
        }
    }
}
</script>

<style scoped>
.friends {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.friends-list {
    display: flex;
    flex-direction: row;
    row-gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: space-between;

}
ul {
    list-style: none;
    padding: 0;
}
</style>