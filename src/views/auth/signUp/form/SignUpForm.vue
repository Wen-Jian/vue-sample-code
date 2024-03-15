<template>
    <div class="mb-5">
        <Label title="Username" />
        <Input @input="handleUsernameChange" placeholder="Enter your username" />
    </div>
    <div class="mb-5">
        <Label title="Email" />
        <Input @input="handleEmailChange" placeholder="Enter your Email" />
    </div>
    <div class="mb-5">
        <Label :title="isWeb3 ? 'Private key' : 'Password'" />
        <Input type="password" @input="handlePasswordChange"
            :placeholder="`Enter your ${isWeb3 ? 'private key' : 'password'}`" />
    </div>
    <Button :disabled="isSigningUp" @click="handleSignUp">Sign Up</Button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '../../../../components/input/Input.vue';
import Label from '../../../../components/label/Label.vue';
import Button from '../../../../components/button/Button.vue';
import { useStore } from 'vuex';
import type { StoreState } from '../../../../model/store';
import { getSignedTransaction } from '../../../../service/web3/web3';
import { sendWeb3SignUpRequest } from '../../../../service/api/authentication';
import { CHAT_AUTH_LOGIN_PATH } from '../../../../constants/path';

const props = defineProps<{
    isWeb3: boolean
}>()

const store = useStore<StoreState>()

const username = ref("")
const email = ref("")
const password = ref("")
const isSigningUp = ref(false)

const handleUsernameChange = (event: Event) => {
    if (!event.target) return
    username.value = (event.target as HTMLInputElement).value
}

const handleEmailChange = (event: any) => {
    if (!event.target) return
    email.value = (event.target as HTMLInputElement).value
}

const handlePasswordChange = (event: any) => {
    if (!event.target) return
    password.value = (event.target as HTMLInputElement).value
}

const handleSignUp = async () => {
    if (props.isWeb3) {
        await web3SignUp()
    }
}

const web3SignUp = async () => {
    isSigningUp.value = true
    const web3 = store.getters.web3Provider
    if (!web3) return
    try {
        let privateKey = password.value
        if (!privateKey.match(/^0x/)) {
            privateKey = "0x" + privateKey
        }
        const signer = web3.eth.accounts.privateKeyToAccount(
            privateKey
        );
        const signedTx = await getSignedTransaction(web3, privateKey, signer)
        await sendWeb3SignUpRequest({
            username: username.value,
            email: email.value,
            signedTransaction: signedTx.rawTransaction,
            walletAddress: signer.address
        })

        window.location.href = CHAT_AUTH_LOGIN_PATH
    } catch (error) {
        console.log(error)
    }
    isSigningUp.value = false
}

</script>