<script setup>
</script>

<template>
    <div>
        <input type="text" v-model="searchString" v-debounce:300ms="emitSearch"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchString: ''
        }
    },
    methods: {
        emitSearch() {
            this.$emit('search', this.searchString);
        }
    }
}
</script>
<style scoped>
div, input {
    width: -webkit-fill-available;
}
input {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
}
</style>