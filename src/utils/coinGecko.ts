import axios from 'axios';

export const getSolanaTokens = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        category: 'solana-ecosystem',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Solana tokens:', error);
    return [];
  }
};
