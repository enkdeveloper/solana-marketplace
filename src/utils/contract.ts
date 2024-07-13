import { Connection, PublicKey, Transaction, SystemProgram, Keypair, clusterApiUrl } from '@solana/web3.js';

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

export const interactWithContract = async (walletAddress: string) => {
  const walletPublicKey = new PublicKey(walletAddress);
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: walletPublicKey,
      toPubkey: Keypair.generate().publicKey,
      lamports: 1000, 
    })
  );

  const { blockhash } = await connection.getRecentBlockhash();
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = walletPublicKey;


  console.log('Transaction created:', transaction);
};
