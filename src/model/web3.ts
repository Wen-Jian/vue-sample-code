export type RequestFromFaucetParams = {
    address: string;
};

export type SignedTransaction = {
    readonly messageHash: string;
    readonly r: string;
    readonly s: string;
    readonly v: string;
    readonly rawTransaction: string;
    readonly transactionHash: string;
}