<template>
    <div class="">
        <div class="w-full mx-auto">
            <div class="mb-5">
                <Label title="Email" />
                <Input @input="handleEmailChange" placeholder="Enter your email" />
            </div>
            <div class="mb-5">
                <Label title="Password" />
                <Input type="password" @input="handlePasswordChange" placeholder="Enter your password" />
            </div>
            <Button @click="handleLogin">Sign In</Button>
        </div>
        <!-- 
            <div v-if="web3Provider" class="lg:max-w-[500px] lg:w-[50vw] mx-auto mt-[50px]">
                <Button @click="handleWeb3Login">Sign In With Web3</Button>
            </div> 
        -->
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { ethers } from "ethers";
// import { Web3 } from "web3"
import Input from "../../components/input/Input.vue";
import Label from "../../components/label/Label.vue";
import Button from "../../components/button/Button.vue";
import axios from "axios";
import { STORE_ACTION_SET_TOKEN } from "../../store/action";
import { useStore } from 'vuex'
import type { AuthResult } from "../../model/auth";
import { API_AUTH_LOGIN_PATH } from "../../constants/path";

// const web3Provider = ref()

// const handleWeb3Login = async () => {
//     const web3 = web3Provider.value
//     const block = await (web3.eth.getBlock("pending"))
//     const transactionReceipt = await web3.eth.sendTransaction({
//         from: "0x74d83656A8E7eCA43ad0A7227272364d387913dD",
//         to: "0xE5f49aF785cffE1C917224062CA18EbFa5F8be0b",
//         value: web3.utils.toWei('0.001', 'ether'),
//         // gasPrice: block.baseFeePerGas
//     });
//     const accounts = await web3.eth.getAccounts()
//     const balance = await web3.eth.getBalance(accounts[0]);
//     const nonce = await web3.eth.getTransactionCount(accounts[0])

//     // const { address} = await web3.eth.accounts.create();
//     // const balance = await web3.eth.getBalance(address);
//     // const nonce = await web3.eth.getTransactionCount(address)
//     console.log(
//         transactionReceipt,
//         balance,
//         nonce,
//         block
//     );
// }
// onMounted(async () => {
//     if (window.ethereum) {
//         // Connect to the MetaMask EIP-1193 object. This is a standard
//         // protocol that allows Ethers access to make all read-only
//         // requests through MetaMask.
//         await window.ethereum.request({ method: 'eth_requestAccounts' });
//         web3Provider.value = new Web3(window.ethereum);

//         // const url = 'http://localhost:10002'
//         // const httpProvider = new Web3.providers.HttpProvider(url);
//         // web3Provider.value = new Web3(httpProvider);
//     } else {
//         // const url = 'http://localhost:10002'
//         // const httpProvider = new Web3.providers.HttpProvider(url);
//         // web3Provider.value = new Web3(httpProvider);
//     }
// })

const store = useStore()
const email = ref("")
const password = ref("")

const handleLogin = async () => {
    try {
        const res = await axios.post<AuthResult>(API_AUTH_LOGIN_PATH, {
            email: email.value,
            password: password.value
        })

        store.commit(STORE_ACTION_SET_TOKEN, res.data.AccessToken)
    } catch (error) {
        console.log(error)
    }
}

const handleEmailChange = (event: any) => {
    email.value = event.target.value
}

const handlePasswordChange = (event: any) => {
    password.value = event.target.value
}

</script>
