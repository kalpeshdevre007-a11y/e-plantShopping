import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const plants = [
  { category: "Air Purifying", name: "Peace Lily", price: 12.99, image: "https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400" },
  { category: "Air Purifying", name: "Spider Plant", price: 8.99, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400" },
  { category: "Air Purifying", name: "Snake Plant", price: 15.99, image: "https://images.unsplash.com/photo-1620127807580-990c3eceChronicles?w=400" },
  { category: "Air Purifying", name: "Aloe Vera", price: 9.99, image: "https://images.unsplash.com/photo-1596547609652-9cf5d8c76ea2?w=400" },
  { category: "Air Purifying", name: "Boston Fern", price: 11.99, image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=400" },
  { category: "Air Purifying", name: "Bamboo Palm", price: 18.99, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
  { category: "Aromatic", name: "Lavender", price: 10.99, image: "https://images.unsplash.com/photo-1499810631641-541e76d678a2?w=400" },
  { category: "Aromatic", name: "Mint", price: 6.99, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400" },
  { category: "Aromatic", name: "Rosemary", price: 7.99, image: "https://images.unsplash.com/photo-1515586838455-8a22d5b66f5c?w=400" },
  { category: "Aromatic", name: "Jasmine", price: 13.99, image: "https://images.unsplash.com/photo-1602910344008-22f323cc1817?w=400" },
  { category: "Aromatic", name: "Lemon Balm", price: 8.49, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400" },
  { category: "Aromatic", name: "Basil", price: 5.99, image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400" },
  { category: "Decorative", name: "Monstera", price: 25.99, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
  { category: "Decorative", name: "Fiddle Leaf Fig", price: 29.99, image: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400" },
  { category: "Decorative", name: "Pothos", price: 7.99, image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400" },
  { category: "Decorative", name: "ZZ Plant", price: 19.99, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400" },
  { category: "Decorative", name: "Rubber Plant", price: 22.99, image: "https://images.unsplash.com/photo-1585666919732-c6b11f3c5b5e?w=400" },
  { category: "Decorative", name: "Calathea", price: 16.99, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400" },
];

function ProductList({ onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [addedItems, setAddedItems] = useState({});

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedItems(prev => ({ ...prev, [plant.name]: true }));
  };

  const categories = [...new Set(plants.map(p => p.category))];

  return (
    <div>
      <nav className="navbar">
        <h2>Paradise Nursery</h2>
        <div>
          <a href="#">Home</a>
          <a href="#">Plants</a>
          <span className="cart-icon" onClick={onCartClick}>
            🛒 <span className="cart-count">{totalCount}</span>
          </span>
        </div>
      </nav>
      {categories.map(category => (
        <div key={category}>
          <h2 style={{ padding: '20px' }}>{category} Plants</h2>
          <div className="product-grid">
            {plants.filter(p => p.category === category).map(plant => (
              <div className="product-card" key={plant.name}>
                <img src={plant.image} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={addedItems[plant.name]}
                  style={{ padding: '8px 20px', background: addedItems[plant.name] ? '#ccc' : '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: addedItems[plant.name] ? 'not-allowed' : 'pointer' }}
                >
                  {addedItems[plant.name] ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
