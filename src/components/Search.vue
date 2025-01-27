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