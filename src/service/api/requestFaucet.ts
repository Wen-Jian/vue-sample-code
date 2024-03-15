import axios from "axios";
import type { RequestFromFaucetParams } from "../../model/web3";
import { API_AUTH_WEB3_FAUCET_PATH } from "../../constants/path";

export const sendRequestFromFaucetRequest = async (params: RequestFromFaucetParams): Promise<void> => {
    await axios.post<void>(API_AUTH_WEB3_FAUCET_PATH, {
        ...params,
    })
    return
}