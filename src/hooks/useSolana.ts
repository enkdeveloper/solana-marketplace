import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { useCallback } from 'react';

export const useSolana = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const buyToken = useCallback(
    async (amount: number, recipient: string) => {
      if (!publicKey) throw new Error('Wallet not connected');
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipient),
          lamports: amount,
        })
      );
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'processed');
    },
    [publicKey, sendTransaction, connection]
  );

  return { buyToken };
};
