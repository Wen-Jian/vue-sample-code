import axios from "axios"
import type { AuthParams, Web3AuthParams, Web3SignUpParams } from "../../model/auth"
import { API_AUTH_LOGIN_PATH, API_AUTH_LOGIN_WEB3_PATH, API_AUTH_WEB3_SIGN_UP_PATH } from "../../constants/path"
import type { ApiResponse, AuthResult } from "../../model/apiResponse"

type AuthResponse = ApiResponse<AuthResult>
type SignUpResponse = ApiResponse<void>

export const sendLoginRequest = async (params: AuthParams): Promise<AuthResult> => {
    const res = await axios.post<AuthResponse>(API_AUTH_LOGIN_PATH, {
        ...params,
    })
    return res.data.data
}

export const sendWeb3AuthRequest = async (params: Web3AuthParams): Promise<AuthResult> => {
    const res = await axios.post<AuthResponse>(API_AUTH_LOGIN_WEB3_PATH, {
        ...params,
    })
    return res.data.data
}

export const sendWeb3SignUpRequest = async (params: Web3SignUpParams): Promise<void> => {
    const res = await axios.post<SignUpResponse>(API_AUTH_WEB3_SIGN_UP_PATH, {
        ...params,
    })
    return res.data.data
}