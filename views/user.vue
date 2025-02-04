
<script setup>
import { useRoute } from 'vue-router'
import User from '@/components/User.vue'
const route = useRoute()

</script>
<template>
    <div class="user-page">
        <h1>Пользователь: {{ friend.first_name }} {{ friend.last_name }}</h1>   
        <div class="users">
            <h2>Дружит с</h2>
            <div class="users-list">
                <User v-for="user in users" :key="user.id" :user="user" :btn="false"/>
            </div>
        </div>
        <div class="posts">
            <h2>Посты</h2>
            <div class="post" v-for="post in posts">
                <div class="attachs">
                    <div class="post-attach" v-for="attachment in post.attachments">
                        <img v-if="attachment.type === 'photo'" :src="attachment?.photo?.orig_photo?.url" class="post-photo" alt="photo">
                        <img v-if="attachment.type === 'doc'" :src="attachment?.doc?.preview?.photo?.sizes.at(-1).src" class="post-photo" alt="photo">
                    </div>
                </div>
                {{ post.text }}
                {{ new Date(post.date*1000).toLocaleDateString() }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            posts: []
        }
    },
    computed: {
        users() {
            return this.$store.getters['users/getUsersByFreind'](this.friend);
        },
        friend() {
            return this.$store.getters['users/getFriendById'](this.$route.params.id);
        }
        
    },
    mounted() {
        VK.Api.call('wall.get', {owner_id: this.$route.params.id, count: 10, v:"5.199"}, (r) =>{
                    console.log(r);
                    if(r.response?.items) {          
                       console.log(r.response.items)
                       this.posts = r.response.items
                    }
                });
    },
}
</script>

<style>
.user-page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}
.users, .posts {
    width: 45%;
}
h1 {
    width: 100%;
}
@media screen and (max-width: 1024px) {
    .user-page {
        flex-direction: column;
    }
    .users, .posts {
        width: 100%;
    }
    
}
.post {
    display: flex;
    flex-direction: column;
    margin: 10px;
    padding: 10px;
    border: 1px solid #150505;
    background-color: #474646;
    border-radius: 5px;
}
.attachs {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;

}
.post img {
    width: 200px;
    height: auto;
    margin: 10px 0;
}
</style>