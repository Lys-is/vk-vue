<script setup>
import { defineProps } from 'vue';

const props = defineProps(['user']);
</script>

<template>
    <div>
        <img :src="user.photo" :alt="user.first_name" class="user-photo" />
        <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>
</template>

<style scoped>
.user-photo {
    width: 100px;
    height: 100px;
}
</style>