<script setup lang="ts">
import { ref, inject, watch, computed } from "vue";
import AddChatIconButton from "./AddChatIconButton.vue";
import List, { type ListItem } from "../../components/list/List.vue";
import type { ChatContext, SubEvent, WsSearchEventData, WsAddRoomEventData } from "../../model/chat";
import { CHAT_CONTEXT, WS_EVENT_ENUM } from "../../constants/chat";
import Label from "../../components/label/Label.vue";
import Input from "../../components/input/Input.vue";
import Modal from "../../components/modal/Modal.vue";
import Button from "../../components/button/Button.vue";

// @ts-ignore
import { SearchEntity, EventEnum, AddRoomEntity } from "proto";

const ctx = inject<ChatContext>(CHAT_CONTEXT) as ChatContext
const selectedRoomId = ctx?.selectedRoomId

const isDialogOpen = ref<boolean>(false)
const searchInput = ref<string>("")
const selectedSearchResultItemId = ref<number | null>(null)

const userList = computed<ListItem[]>(() => {
    const list: ListItem[] = []
    if (ctx && ctx.wsEventData.value && ctx.wsEventData.value.event === WS_EVENT_ENUM.SEARCH) {
        for (const idx in ctx.wsEventData.value.data) {
            list.push({ name: (ctx.wsEventData.value.data as WsSearchEventData)[Number(idx)].name, id: Number(idx) })
        }
    }
    return list
})

const handleAddRoom = () => {
    if (userList.value.length === 0) {
        return
    }
    if (selectedSearchResultItemId.value === null) {
        return
    }
    const entity = new AddRoomEntity()
    const target = userList.value[selectedSearchResultItemId.value]
    entity.setMembersList([target.name])
    entity.serializeBinary()
    ctx?.sendWsEvent(EventEnum.ADD_ROOM, entity, "AddRoomEntity")
}

const handleOpenSearchDialog = () => {
    isDialogOpen.value = true
}

const handleCloseSearchDialog = () => {
    isDialogOpen.value = false
    searchInput.value = ""
    selectedSearchResultItemId.value = null
    if (ctx) {
        ctx.wsEventData.value = null
    }
}

const handleInputChange = (e: Event) => {
    searchInput.value = (e.target as HTMLInputElement).value
}

const handleSearch = () => {
    if (!searchInput.value) {
        return
    }
    const entity = new SearchEntity()
    entity.setUsername(searchInput.value)
    selectedSearchResultItemId.value = null
    ctx?.sendWsEvent(EventEnum.SEARCH, entity, "SearchEntity")
}

const handleSearchResultItemClick = (id: number) => {
    selectedSearchResultItemId.value = id
}

const handleItemSelected = (id: number) => {
    ctx.setSelectedRoomId(id)
}

watch(ctx.wsEventData, () => {
    if (ctx.wsEventData && ctx.wsEventData.value &&
        ctx.wsEventData.value.event === WS_EVENT_ENUM.SUBSCRIBE_RES) {
        const data = ctx.wsEventData.value.data as WsAddRoomEventData
        if (data.success) {
            handleCloseSearchDialog()
        }
    }
})

</script>

<template>
    <div class="bg-orange-100 h-screen">
        <List v-if="ctx" :items="ctx?.roomList.value.map(x => ({ name: x.getRoomname(), id: x.getRoomid() }))"
            @item-click="handleItemSelected" :item-height="60" :active-item="selectedRoomId || 0" />
        <AddChatIconButton @click="handleOpenSearchDialog" class="sticky top-[80%] float-right" />
    </div>
    <Modal class="md:w-[100vw] sm:w-[100vw]" v-if="isDialogOpen" @handle-close="handleCloseSearchDialog">
        <template v-slot:body>
            <Label title="Search By User Name" />
            <Input @input="handleInputChange" placeholder="Enter user name" />
            <div class="max-h-[200px] overflow-y-auto">
                <List :items="userList" @item-click="handleSearchResultItemClick"
                    :active-item="selectedSearchResultItemId" />
            </div>
        </template>
        <template v-slot:footer>
            <Button @click="handleSearch">Search</Button>
            <Button :disabled="selectedSearchResultItemId === null" @click="handleAddRoom" color="green">Add</Button>
        </template>
    </Modal>
</template>