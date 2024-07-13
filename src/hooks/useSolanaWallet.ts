import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

const useSolanaWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const { publicKey } = useWallet();

  useEffect(() => {
    if (publicKey) {
      setWalletAddress(publicKey.toString());
    }
  }, [publicKey]);

  return { walletAddress };
};

export default useSolanaWallet;
