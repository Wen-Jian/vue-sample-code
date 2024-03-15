import type { Ref } from "vue"

export type AuthParams = {
    username: string
    password: string
}

export type LoginFormProps = {
    isWeb3Login: boolean
}

export type Web3AuthParams = {
    signedTransaction: string
    address: string
}

export type Web3SignUpParams = {
    signedTransaction: string
    username: string
    email: string
    walletAddress: string
}