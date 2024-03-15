import type Web3 from "web3"
import type { RegisteredSubscription } from "web3/lib/commonjs/eth.exports"

export type StoreState = {
    token: string | null
    modal: ModalState
    web3Provider: Web3<RegisteredSubscription> | null
}

export type ModalState = {
    isOpen: boolean
    content: string
}