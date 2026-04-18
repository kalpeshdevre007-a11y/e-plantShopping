import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon! Thank you for shopping at Paradise Nursery.');
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#" onClick={handleContinueShopping} style={{ color: 'white', textDecoration: 'none' }}>Home</a>
          <a href="#" onClick={handleContinueShopping} style={{ color: 'white', textDecoration: 'none' }}>Plants</a>
          <span style={{ color: 'white' }}>🛒 <span className="cart-count">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span></span>
        </div>
      </nav>
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <h3>Total Cart Amount: ${totalAmount.toFixed(2)}</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <a href="#" onClick={handleContinueShopping}>Continue Shopping</a></p>
        ) : (
          cartItems.map(item => (
            <div className="cart-item" key={item.name}>
              <img src={item.image} alt={item.name} />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Total Cost: ${(item.price * item.quantity).toFixed(2)}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '1rem' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '1rem' }}>+</button>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item)}
                style={{ background: 'red', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
          ))
        )}
        <div style={{ marginTop: '20px' }}>
          <button
            onClick={handleContinueShopping}
            style={{ padding: '10px 30px', marginRight: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Continue Shopping
          </button>
          <button
            onClick={handleCheckout}
            style={{ padding: '10px 30px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
