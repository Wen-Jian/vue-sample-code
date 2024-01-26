<template>
    <!-- text-white right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 -->
    <button 
        class="w-full h-full disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-gradient-to-r disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        :class="theme"
        :disabled="props.disabled"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    disabled?: boolean
    color?: string
}>()

const theme = computed(() => {
    switch (props.color) {
    case 'green':
        return "bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800"
    default:
        return "text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    }
})
</script>