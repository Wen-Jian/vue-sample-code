<template>
    <FormWrapper>
        <component :is="component"></component>

        <div v-if="web3Provider" class="lg:max-w-[500px] lg:w-[50vw] mx-auto mt-[50px]">
            <Button color="light" @click="handleWeb3Login">Login With {{ component === "LoginForm" ? 'Web3' : 'Username'
                }}</Button>
        </div>
    </FormWrapper>
</template>

<script setup lang="ts">
import { onMounted, provide, ref } from "vue";
// import { ethers } from "ethers";
import { Web3 } from "web3"
import Button from "../../../components/button/Button.vue";
import FormWrapper from "../FormWrapper.vue";


const web3Provider = ref<Web3>()
const component = ref("LoginForm")


const handleWeb3Login = () => {
    component.value = component.value === "LoginForm" ? "Web3LoginForm" : "LoginForm";
}

onMounted(async () => {
    // @ts-ignore
    if (typeof web3 !== 'undefined') {
        // Connect to the MetaMask EIP-1193 object. This is a standard
        // protocol that allows Ethers access to make all read-only
        // requests through MetaMask.
        // await window.ethereum.request({ method: 'eth_requestAccounts' });
        // web3Provider.value = new Web3(window.ethereum);

        // @ts-ignore
        web3Provider.value = new Web3(web3.currentProvider);
    } else {
        // const url = 'http://localhost:10002'
        // const httpProvider = new Web3.providers.HttpProvider(url);
        // web3Provider.value = new Web3(httpProvider);
    }
})
</script>

<script lang="ts">
import LoginForm from "./form/LoginForm.vue";
import Web3LoginForm from "./form/Web3LoginForm.vue";

export default {
    components: {
        LoginForm,
        Web3LoginForm
    }

}
</script>
