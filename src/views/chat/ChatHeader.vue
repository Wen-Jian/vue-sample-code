<template>
    <div class="flex justify-center items-center w-full bg-gray-700 border-gray-600 text-white text-2xl lg:text-base lg:h-[60px]">
        <div @click="handleClick" class="w-[1vh] absolute left-2 max-w-[15px] min-w-[10px] lg:hidden">
            <BackIcon />
        </div>
        {{ title }}
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { CHAT_CONTEXT } from "../../constants/chat";
import BackIcon from "../../images/svg/backIcon.vue";
import type { ChatContext } from "../../model/chat";
defineProps<{ title: string }>()

const ctx = inject<ChatContext>(CHAT_CONTEXT)

const handleClick = () => {
    if (ctx) {
        ctx.setSelectedRoomId(0)
    }
}
</script>