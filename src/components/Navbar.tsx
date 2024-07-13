import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.png';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

type NavbarProps = {
  cartItems: any[];
  clearCart: () => void;
  removeFromCart: (index: number) => void;
};

const Navbar: React.FC<NavbarProps> = ({ cartItems, clearCart, removeFromCart }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-800 via-purple-700 to-orange-500 p-4 relative">
        <div className="container mx-auto flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />
            <h1 className="text-white text-2xl">Marketplace</h1>
          </div>
          <div className="flex items-center relative">
            <div className="relative cursor-pointer" onClick={toggleCart}>
              <FontAwesomeIcon icon={faShoppingCart} className="text-gray-700 text-2xl mr-4" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-sm">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>
        </div>
        {isCartOpen && (
          <div className="absolute right-0 mt-2 w-full sm:w-96 bg-gray-700 text-white rounded-lg shadow-lg p-4 z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl">Shopping Cart</h2>
              <button className="text-gray-300 hover:text-gray-400" onClick={toggleCart}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index} className="mb-2 flex items-center">
                    <img src={item.image} alt={item.name} className="h-10 w-10 mr-2" />
                    <div className="flex-grow">
                      <p className="font-bold">{item.name}</p>
                      <p>Current Price: ${item.current_price.toFixed(2)}</p>
                      <p>24h High: ${item.high_24h.toFixed(2)}</p>
                      <p>24h Low: ${item.low_24h.toFixed(2)}</p>
                    </div>
                    <button
                      className="text-red-500 hover:text-red-700 ml-4"
                      onClick={() => removeFromCart(index)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4">
              <WalletMultiButton />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
