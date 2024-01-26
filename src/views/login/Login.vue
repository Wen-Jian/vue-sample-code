<template>
    <div v-if="!store.state.token" class="w-full h-[100vh] flex justify-center items-center flex-col">
        <div className="lg:max-w-[500px] w-[80vw]">
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center"><span :style="{
                '-webkit-background-clip': 'text',
                'color': 'transparent',
                'font-family': 'fantasy, monospace, Proxima Nova'
            }" class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 italic">Chat
                    Demo</span></h1>
    
            <LoginForm />
            <div class="mt-[10px]">
                <Button @click="handleSignUp" color="green">Sign Up</Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import LoginForm from "./LoginForm.vue";
import { onMounted, watch } from "vue";
import { useStore } from 'vuex'
import { CHAT_CLIENT_PATH } from "../../constants/path";
import Button from "../../components/button/Button.vue";

const store = useStore()

const handleSignUp = () => {
    window.open('https://demo-chat.auth.ap-northeast-1.amazoncognito.com/signup?client_id=o6gu611lpduttu70gmdc3dvpn&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fplayground-bafp.onrender.com%2Fchat%2Flogin', '_blank');
}

watch(() => store.state.token, () => {
    if (store.state.token) {
        window.location.href = CHAT_CLIENT_PATH
    }
})

onMounted(() => {
    if (store.state.token) {
        window.location.href = CHAT_CLIENT_PATH
    }
})
</script>