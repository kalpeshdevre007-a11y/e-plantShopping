import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import CartItem from './CartItem';

function App() {
  const [showProducts, setShowProducts] = useState(false);
  const [showCart, setShowCart] = useState(false);

  if (showCart) {
    return <CartItem onContinueShopping={() => { setShowCart(false); setShowProducts(true); }} />;
  }

  if (showProducts) {
    return <ProductList onCartClick={() => setShowCart(true)} />;
  }

  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>
      <p>Where Green Meets Serenity</p>
      <button className="get-started-btn" onClick={() => setShowProducts(true)}>
        Get Started
      </button>
    </div>
  );
}

export default App;
