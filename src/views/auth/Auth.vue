<template>
    <div v-if="!store.getters.token" class="w-full h-[100vh] flex justify-center items-center flex-col">
        <div className="lg:max-w-[500px] w-[80vw]">
            <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
                <span :style="{
        '-webkit-background-clip': 'text',
        'color': 'transparent',
        'font-family': 'fantasy, monospace, Proxima Nova'
    }" class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 italic">Chat
                    Demo</span>
            </h1>

            <h1 class="text-[white] text-center mb-[10%]">{{ isSignInRef ? "Sign In" : "Sign Up" }}</h1>

            <component :is="isSignInRef ? 'LoginForm' : 'SignUpForm'"></component>

            <div class="mt-[10px]">
                <Button @click="handleSignUpLoginSwitch" color="green">Sign {{ !isSignInRef ? "Up" : "In"
                    }}</Button>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import Button from "../../components/button/Button.vue";

const store = useStore()
const isSignInRef = ref(true)
const isLoading = ref(false)
provide<AuthContext & IAuthContext>(/* 注入名 */ AUTH_CONTEXT, /* 值 */ {
    isLoading: isLoading,
    setIsLoading: (val: boolean) => {
        isLoading.value = val
    }
})

const handleSignUpLoginSwitch = () => {
    isSignInRef.value = !isSignInRef.value
}

</script>

<script lang="ts">
import LoginForm from "./login/LoginForm.vue";
import SignUpForm from "./signUp/SignUp.vue";
import { provide, ref } from 'vue';
import { AUTH_CONTEXT } from '../../constants/context';
import { AuthContext, IAuthContext } from '../../model/chat';

export default {
    components: {
        LoginForm,
        SignUpForm,
    },
};
</script>