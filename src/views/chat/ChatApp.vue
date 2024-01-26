<script setup lang="ts">
import ControlPanel from "./ChatControlPanel.vue";
import RoomsNav from "./RoomsNav.vue";
import ChatBox from "./ChatBox.vue";
import ChatMessageBox from "./ChatMessageBox.vue";
import ChatHeader from "./ChatHeader.vue";
import { computed, onMounted, ref, type ComputedRef } from "vue";
import { useStore } from "vuex";
import type { IRoomItem, StoredMsgsState } from "../../model/chat";
// @ts-ignore
import { Request, SearchResEntity, EventEnum, Response, SubRes, MessageEntity, SendMsgRes } from "proto";
import { provide } from 'vue'
import { CHAT_CONTEXT } from "../../constants/chat";
import type { ChatContext, WsEventData } from "../../model/chat";
import { CHAT_AUTH_LOGIN_PATH } from "../../constants/path";
import { STORE_ACTION_SET_TOKEN } from "../../store/action";
import type { StoreState } from "../../model/store";
import { WS_EVENT_ENUM } from "../../constants/chat";

const wsRef = ref<WebSocket | null>(null)
const isOpen = ref<boolean>(false)
const roomList = ref<IRoomItem[]>([])
const wsEventData = ref<WsEventData | null>(null)
const selectedRoomId = ref<number>(0)
const storedMsgs = ref<StoredMsgsState>({})

const store = useStore<StoreState>()

const title: ComputedRef<string> = computed(() => {
    return roomList.value.filter((r) => r.getRoomid() === selectedRoomId.value)[0].getRoomname()
})

const setRoomList = (newRoomList: IRoomItem[]) => {
    roomList.value = newRoomList
}

const setSelectedRoomId = (id: number) => {
    selectedRoomId.value = id
}

const sendWsEvent = (event: EventEnum, data: any, entityName: string) => {
    if (wsRef.value !== null) {
        const req = new Request()
        req.setEvent(event)

        const anyPayload = new proto.google.protobuf.Any()

        if (data != null) {
            anyPayload.pack(data.serializeBinary(), entityName);
            anyPayload.value = data
        }

        req.setPayload(anyPayload)
        const tmp = req.serializeBinary()
        wsRef.value.send(tmp)
    }
}

provide<ChatContext>(/* 注入名 */ CHAT_CONTEXT, /* 值 */ {
    roomList: roomList,
    selectedRoomId: selectedRoomId,
    storedMsgs: storedMsgs,
    wsEventData: wsEventData,
    setRoomList,
    setSelectedRoomId,
    sendWsEvent
})

const handleSubscribe = () => {
    if (wsRef.value !== null) {
        sendWsEvent(EventEnum.SUBSCRIBE, null, "SubEntity")
    }
}

const handleReceivingMsg = (msg: any) => {
    const res = Response.deserializeBinary(msg)
    const temp = res.getPayload()
    let payload: any
    const msgs = storedMsgs.value
    const users = []
    const err = res.getError()
    if (err) {
        console.log(err)
    }
    switch (res.getEvent()) {
        case EventEnum.SUBSCRIBE:
            if (err) {
                store.commit(STORE_ACTION_SET_TOKEN, "")
                location.href = CHAT_AUTH_LOGIN_PATH
                return
            }
            payload = temp.unpack(SubRes.deserializeBinary, "SubRes")
            if (payload.getSuccess()) {
                isOpen.value = true
                payload.getRoomsList()

                setRoomList(payload.getRoomsList())
            }
            wsEventData.value = {
                event: WS_EVENT_ENUM.SUBSCRIBE_RES,
                data: {
                    success: true,
                    rooms: payload.getRoomsList()
                }
            }
            break
        case EventEnum.SEND_MSG:
            payload = temp.unpack(SendMsgRes.deserializeBinary, "SendMsgRes")
            if (payload.getSuccess()) {
                console.log("send msg success")
            }
            break
        case EventEnum.SEARCH:
            payload = temp.unpack(SearchResEntity.deserializeBinary, "SearchResEntity")
            console.log(payload.getUsersList())
            for (let userProto of payload.getUsersList()) {
                users.push({
                    email: userProto.getEmail(),
                    name: userProto.getUsername(),
                })
            }
            wsEventData.value = {
                event: WS_EVENT_ENUM.SEARCH,
                data: users
            }
            break
        case EventEnum.RECEIVE_MSG:
            payload = temp.unpack(MessageEntity.deserializeBinary, "MessageEntity")

            if (!msgs[payload.getRoomid()]) {
                msgs[payload.getRoomid()] = [{
                    content: payload.getContent(),
                    timestamp: payload.getTimestamp(),
                    senderName: payload.getSendername(),
                    isMine: payload.getIsmine()
                }]
            } else {
                storedMsgs.value[payload.getRoomid()].push({
                    content: payload.getContent(),
                    timestamp: payload.getTimestamp(),
                    senderName: payload.getSendername(),
                    isMine: payload.getIsmine()
                })
            }
            break
    }
}

onMounted(() => {
    if (!store.state.token) {
        window.location.href = CHAT_AUTH_LOGIN_PATH
    }

    try {
        if (wsRef.value === null) {
            const ws = new WebSocket(`${import.meta.env.VITE_WS_DOMAIN}/chat/ws?token=${store.state.token}`);
            ws.binaryType = 'arraybuffer';
            ws.onopen = () => {
                handleSubscribe()
                console.log('[open connection]')
            }
            wsRef.value = ws
            ws.onmessage = event => {
                handleReceivingMsg(event.data)
            }
        }
    } catch (error) {
        console.log("ws failed", error)
    }
})

</script>

<template>
    <div v-if="store.state.token"
        class="w-full bg-gray-100 lg:max-w-[1200px] lg:grid lg:grid-cols-12 mx-auto h-screen lg:min-w-[900px]">
        <ControlPanel />
        <div class="grid grid-cols-3 lg:col-span-11">
            <div class="lg:col-span-1 lg:z-1 col-span-3" :class="{ 'z-10': !selectedRoomId, 'z-1': selectedRoomId }">
                <RoomsNav />
            </div>
            <div class="lg:col-span-2 col-span-3 h-[100vh] lg:relative absolute w-full">
                <div v-if="selectedRoomId" class="flex flex-col h-full bg-gray-100">
                    <div>
                        <ChatHeader :title="title" />
                    </div>
                    <div class="grow overflow-y-auto max-h-[100%] pb-[90px]">
                        <ChatMessageBox />
                    </div>
                    <div class="w-full lg:relative fixed bottom-0">
                        <ChatBox />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>