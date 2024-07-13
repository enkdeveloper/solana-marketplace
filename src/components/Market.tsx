import React, { useEffect, useState } from 'react';
import { getSolanaTokens } from '../utils/coinGecko';

type MarketProps = {
  addToCart: (coin: any) => void;
};

const Market: React.FC<MarketProps> = ({ addToCart }) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [visibleCoins, setVisibleCoins] = useState<number>(6); 

  useEffect(() => {
    const fetchCoins = async () => {
      const data = await getSolanaTokens();
      setCoins(data);
    };
    fetchCoins();
  }, []);

  const handleShowMore = () => {
    setVisibleCoins(visibleCoins + 6); 
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Marketplace</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {coins.slice(0, visibleCoins).map((coin) => (
          <div key={coin.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <img src={coin.image} alt={coin.name} className="h-10 w-10 mr-2" />
              <h3 className="text-xl font-semibold">{coin.name}</h3>
            </div>
            <p>Current Price: ${coin.current_price.toFixed(2)}</p>
            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
            <p>24h High: ${coin.high_24h.toFixed(2)}</p>
            <p>24h Low: ${coin.low_24h.toFixed(2)}</p>
            <p>24h Volume: ${coin.total_volume.toLocaleString()}</p>
            <button
              className="mt-4 text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded"
              onClick={() => addToCart(coin)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      {visibleCoins < coins.length && (
        <div className="text-center mt-4">
          <button
            onClick={handleShowMore}
            className="text-white bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded"
          >
            More...
          </button>
        </div>
      )}
    </div>
  );
};

export default Market;

