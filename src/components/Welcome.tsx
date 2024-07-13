import React, { useState, useEffect, useMemo } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, PublicKey, Transaction, SystemProgram, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';

const Welcome: React.FC = () => {
  const { publicKey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  const connection = useMemo(() => new Connection(clusterApiUrl('devnet'), 'confirmed'), []);

  useEffect(() => {
    if (publicKey) {
      connection.getBalance(publicKey).then(balance => {
        setBalance(balance / LAMPORTS_PER_SOL);
      });
    }
  }, [publicKey, connection]);

  const handleSendTransaction = async () => {
    if (publicKey) {
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('RecipientPublicKeyHere'), 
          lamports: 0.1 * LAMPORTS_PER_SOL, 
        })
      );
      const { blockhash } = await connection.getRecentBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      try {
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'confirmed');
        alert('Transaction successful!');
      } catch (error) {
        console.error('Transaction failed', error);
        alert('Transaction failed');
      }
    }
  };

  return (
    <div className="text-center p-4">
      <p className="text-lg sm:text-xl mb-4 mt-5">Connect your Phantom wallet to start interacting with the Solana blockchain.</p>
      {publicKey ? (
        <>
          <p className="text-lg sm:text-xl mb-4">Wallet Address: {publicKey.toString()}</p>
          <p className="text-lg sm:text-xl mb-4">Balance: {balance !== null ? `${balance} SOL` : 'Loading...'}</p>
          <button
            onClick={handleSendTransaction}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mt-2"
          >
            Send 0.1 SOL
          </button>
        </>
      ) : (
        <p className="text-lg sm:text-xl mb-4">Please connect your Phantom wallet.</p>
      )}
    </div>
  );
};

export default Welcome;
