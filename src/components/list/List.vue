<script setup lang="ts">
export type ListProps = {
    items: {id: number, name: string, icon?: any}[],
    itemHeight?: number,
    activeItem?: number|null,
    alignItems?: string
    rounded?: boolean
}

export type ListItem = {
    id: number,
    name: string,
    icon?: any
}

defineProps<ListProps>()

const emits = defineEmits(['itemClick'])

const handleClick = (id: number) => {
    emits('itemClick', id)
}

</script>

<template>
    <div
        class="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <a class="block w-full px-4 py-2 " v-for="obj in items" :key="obj.id" href="#"
            :class="{
                'text-white bg-blue-700 border-b border-gray-200 cursor-pointer dark:bg-gray-800 dark:border-gray-600': activeItem === obj.id,
                'border-b border-gray-200 cursor-pointer hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white': !(activeItem === obj.id),
                'flex items-center justify-center': alignItems === 'center',
                'rounded-lg': rounded,
                'rounded-t-lg': activeItem === obj.id && rounded
            }"
            :style="{ 
                height: itemHeight ? `${itemHeight}px` : '60px',
            }" @click="handleClick(obj.id)">
            {{ obj.name }}
        </a>
    </div>
</template>