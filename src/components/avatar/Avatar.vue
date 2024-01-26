<template>
    <div v-if="!iconSrc" class="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
        T
    </div>
    <img v-if="iconSrc" class="w-10 h-10 rounded-full" :src="iconSrc" alt="Rounded avatar">
</template>

<script setup lang="ts">
    defineProps<{
        iconSrc?: string
    }>()
</script>