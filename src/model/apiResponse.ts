export type ApiResponse<T> = {
    chainId: string
    data: T
    errMsg: string
}

export type AuthResult = {
    accessToken: string
    refreshToken: string
}