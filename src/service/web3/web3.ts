import type Web3 from 'web3';
import type { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import type { SignedTransaction } from '../../model/web3';
import type { Transaction } from 'web3';
import { sendRequestFromFaucetRequest } from '../api/requestFaucet';
import { Web3Account } from "web3-eth-accounts";


export const signTransacation = async (
  web3: Web3<RegisteredSubscription>,
  privateKey: string,
  signer: Web3Account
): Promise<SignedTransaction> => {
  const tx: Transaction = {
    from: signer.address,
    to: '0x74d83656A8E7eCA43ad0A7227272364d387913dD',
    value: web3.utils.toWei('0.01', 'ether'),
    // data,
    nonce: await web3.eth.getTransactionCount(signer.address),
    chainId: await web3.eth.getChainId(),
  };

  const limit = await web3.eth.estimateGas(tx);
  tx.gas = limit;

  tx.gasPrice = await web3.eth.getGasPrice();

  const signedTx = await signer.signTransaction(tx);

  return signedTx;
};

export const getSignedTransaction = async (
  web3: Web3<RegisteredSubscription>,
  privateKey: string,
  signer: Web3Account
): Promise<SignedTransaction> => {
  const balance = await web3.eth.getBalance(signer.address);
  if (balance < BigInt(web3.utils.toWei('0.02', 'ether'))) {
    await sendRequestFromFaucetRequest({
      address: signer.address,
    });
  }
  return signTransacation(web3, privateKey, signer);
};
