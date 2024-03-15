<template>
    <div v-for="item in data" v-bind:key="item.value" class="flex items-center mb-4">
        <input @change="onChange" name="default-radio" type="radio" :value="item.value"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
        <label for="default-radio-1" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{{ item.title }}</label>
    </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

defineProps<{
    data: {
        title: string,
        value: string
    }[]
}>()

const emits = defineEmits(['handleChange'])

const onChange = (e: Event) => {
    emits('handleChange', e.target ? (e.target as HTMLInputElement).value : "")
}
</script>