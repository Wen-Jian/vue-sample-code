<template>
    <div v-if="storedMsgs && selectedRoomId" class="p-[10px]">
        <div  v-for="msg in (storedMsgs[selectedRoomId] as any)" 
            :key="msg"
            class="flex items-center my-[10px]" 
            :class="{
                'justify-start':  msg.isMine,
                'flex-row-reverse': msg.isMine
            }"
        >
            <Avatar />
            <div 
                class="bg-gray-300 p-2 rounded-lg text-xl"
                :class="{
                    'mr-2': msg.isMine,
                    'ml-2': !msg.isMine
                }"
            >{{ msg.content }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { CHAT_CONTEXT } from "../../constants/chat";
import type { ChatContext } from "../../model/chat";
import Avatar from "../../components/avatar/Avatar.vue";

const ctx = inject<ChatContext>(CHAT_CONTEXT)
const selectedRoomId = ctx?.selectedRoomId
const storedMsgs = ctx?.storedMsgs

</script>