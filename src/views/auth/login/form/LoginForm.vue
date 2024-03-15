<template>
    <div class="mb-5">
        <Label title="Username" />
        <Input @input="handleUsernameChange" placeholder="Enter your username" />
    </div>
    <div class="mb-5">
        <Label title="Password" />
        <Input type="password" @input="handlePasswordChange" placeholder="Enter your password" />
    </div>
    <Button @click="handleLogin">Sign In</Button>
</template>

<script setup lang="ts">
import { STORE_ACTION_SET_TOKEN } from '../../../../store/action';
import { sendLoginRequest } from '../../../../service/api/authentication';
import { ref } from 'vue';
import { useStore } from 'vuex';
import type { StoreState } from '../../../../model/store';
import Input from "../../../../components/input/Input.vue";
import Button from "../../../../components/button/Button.vue";

const store = useStore<StoreState>()
const username = ref("")
const password = ref("")

const handleUsernameChange = (event: any) => {
    username.value = event.target.value
}

const handlePasswordChange = (event: any) => {
    password.value = event.target.value
}

const handleLogin = async () => {
    try {
        const res = await sendLoginRequest({
            username: username.value,
            password: password.value
        })

        store.commit(STORE_ACTION_SET_TOKEN, res.accessToken)
    } catch (error) {
        console.log(error)
    }
}

</script>