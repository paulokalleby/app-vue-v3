<template>
    <div v-if="show"  class="d-flex justify-content-center wrapper">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    show: Boolean,
})
</script>

<style scoped>
.wrapper {
    z-index: 9999;
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.5;
}
</style>