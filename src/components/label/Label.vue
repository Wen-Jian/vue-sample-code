<template>
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{{ title }}</label>
</template>

<script setup lang="ts">
defineProps<{
    title: string
}>()
</script>