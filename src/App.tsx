import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Market from './components/Market';
import Welcome from './components/Welcome';
import Wallet from './components/Wallet';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (coin: any) => {
    setCartItems([...cartItems, coin]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const removeFromCart = (index: number) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  return (
    <Wallet>
      <div className="bg-gray-900 min-h-screen text-white">
        <Navbar cartItems={cartItems} clearCart={clearCart} removeFromCart={removeFromCart} />
        <Welcome />
        <Market addToCart={addToCart} />
      </div>
    </Wallet>
  );
};

export default App;
