<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import InputWithButton from "../../components/inputWithButton/InputWithButton.vue";
import type { ChatContext } from "../../model/chat";
import { CHAT_CONTEXT } from "../../constants/chat";

// @ts-ignore
import { EventEnum, MessageEntity } from "proto";

const ctx = inject<ChatContext>(CHAT_CONTEXT)

const inputRef = ref<string>("")

const handleClick = () => {
    if (ctx && ctx.selectedRoomId.value != 0) {
        const entity = new MessageEntity()
        entity.setContent(inputRef.value)
        entity.setRoomid(ctx.selectedRoomId.value)
        entity.setTimestamp(Date.now())
        entity.serializeBinary()

        ctx.sendWsEvent(EventEnum.SEND_MSG, entity, "MessageEntity")
        inputRef.value = ""
    }
}

const onInput = (text: string) => {
    inputRef.value = text
}

onMounted(() => {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && inputRef.value !== "") {
            handleClick()
            inputRef.value = ""
        }
    });
})

</script>

<template>
    <div class="grid grid-cols-12 bg-white p-4">
        <div class="col-span-12">
            <InputWithButton :value="inputRef" @handle-change="onInput" @handle-click="handleClick" :button-title="'Send'" :placeholder="'text here'" />
        </div>
    </div>
</template>