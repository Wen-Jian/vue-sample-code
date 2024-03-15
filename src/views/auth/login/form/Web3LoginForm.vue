<template>
    <div class="">
        <div class="w-full mx-auto">
            <div class="mb-5">
                <Label title="Secret key" />
                <Input type="password" @input="handleSecretKeyChange"
                    placeholder="Please enter your wallet secret key" />
            </div>

            <Button :disabled="ctx.isLoading.value" @click="handleWeb3Login">
                <template v-if="ctx.isLoading.value">
                    Loading...
                </template>
                <template v-if="!ctx.isLoading.value">
                    Sign In
                </template>
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
import Button from "../../../../components/button/Button.vue";
import Input from "../../../../components/input/Input.vue";
import Label from "../../../../components/label/Label.vue";
import { Web3 } from "web3";
import { abi, networks } from "auth-token-contract";
import { sendWeb3AuthRequest } from "../../../../service/api/authentication";
import type { AxiosResponse } from "axios";
import { STORE_ACTION_SET_TOKEN } from "../../../../store/action";
import { useStore } from "vuex";
import type { StoreState } from "../../../../model/store";
import { getSignedTransaction } from "../../../../service/web3/web3";
import { AuthContext, IAuthContext } from "../../../../model/chat";
import { AUTH_CONTEXT } from "../../../../constants/context";

const secretKey = ref<string>("")
const store = useStore<StoreState>()
type ConbinedAuthContext = AuthContext & IAuthContext

const ctx = inject<ConbinedAuthContext>(AUTH_CONTEXT) as ConbinedAuthContext

const handleSecretKeyChange = (e: Event) => {
    if (e.target) {
        secretKey.value = (e.target as HTMLInputElement).value
    }
}

const handleWeb3Login = async () => {
    if (!secretKey.value) {
        // TODO: show error
        return
    }

    // isLoading.value = true
    ctx?.setIsLoading(true)

    // const url = import.meta.env.VITE_WEB3_HTTP_RPC_URL
    // const httpProvider = new Web3.providers.HttpProvider(url);
    // const web3 = new Web3(httpProvider);

    const web3 = store.getters.web3Provider

    if (!web3) return
    const authTokenContract = new web3.eth.Contract(
        abi,
        networks["313"].address
    )

    let privateKey = secretKey.value
    if (!privateKey.match(/^0x/)) {
        privateKey = "0x" + privateKey
    }

    try {
        const signer = web3.eth.accounts.privateKeyToAccount(
            privateKey
        );

        // const balance = await web3.eth.getBalance(signer.address)
        // if (balance < BigInt(web3.utils.toWei("0.02", "ether"))) {
        //     await sendRequestFromFaucetRequest({
        //         address: signer.address
        //     })
        // }

        // const signedTx = await signTransacation(web3, privateKey, signer)
        if (!web3) return
        const signedTx = await getSignedTransaction(web3, privateKey, signer)
        const res = await sendWeb3AuthRequest({
            signedTransaction: signedTx.rawTransaction,
            address: signer.address
        })

        store.commit(STORE_ACTION_SET_TOKEN, res.accessToken)

        // const receipt = await web3.eth
        //     .sendSignedTransaction(signedTx.rawTransaction)
        //     .once("transactionHash", (txhash) => {
        //         console.log(`Mining transaction ...`);
        //         console.log("transactionHash:", txhash);
        //     });
        // The transaction is now on chain!
        // console.log(`Mined in block ${receipt.blockNumber}`);
    } catch (error) {
        console.log((error as { response: AxiosResponse<{ errMsg: string }> }).response.data.errMsg)
    }
    ctx?.setIsLoading(false)
}

// const signTransacation = async (web3: Web3<RegisteredSubscription>, privateKey: string): Promise<SignedTransaction> => {
//     const signer = web3.eth.accounts.privateKeyToAccount(
//         privateKey
//     );

//     const balance = await web3.eth.getBalance(signer.address)
//     if (balance < BigInt(web3.utils.toWei("0.02", "ether"))) {
//         await sendRequestFromFaucetRequest({
//             address: signer.address
//         })
//     }

//     const tx: Transaction = {
//         from: signer.address,
//         to: "0x74d83656A8E7eCA43ad0A7227272364d387913dD",
//         value: web3.utils.toWei("0.01", "ether"),
//         // data,
//         nonce: await web3.eth.getTransactionCount(signer.address),
//         chainId: await web3.eth.getChainId(),
//     }


//     const limit = await web3.eth.estimateGas(tx);
//     tx.gas = limit;

//     tx.gasPrice = await web3.eth.getGasPrice();


//     const signedTx = await signer.signTransaction(tx)

//     return signedTx
// }
</script>