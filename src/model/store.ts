export type StoreState = {
    token: string | null
    modal: ModalState
}

export type ModalState = {
    isOpen: boolean
    content: string
}