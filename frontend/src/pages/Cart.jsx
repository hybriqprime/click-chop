import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(stored);
  }, []);

  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleQuantityChange = (menuItem, quantity) => {
    const updated = cart.map((item) =>
      item.menuItem === menuItem ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    updateCart(updated);
  };

  const handleRemove = (menuItem) => {
    const updated = cart.filter((item) => item.menuItem !== menuItem);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="text-gray-500 mb-6">Your cart is empty.</p>
        <Link to="/menu" className="text-terracotta-600 hover:underline">
          Browse the menu &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="space-y-4 mb-8">
        {cart.map((item) => (
          <div
            key={item.menuItem}
            className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
          >
            <div>
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-terracotta-600 font-bold">₦{item.price.toLocaleString()}</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.menuItem, Number(e.target.value))}
                className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-center"
              />
              <button
                onClick={() => handleRemove(item.menuItem)}
                className="text-red-600 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t pt-6">
        <span className="text-xl font-bold">Total: ₦{total.toLocaleString()}</span>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-terracotta-600 text-white px-8 py-3 rounded-lg hover:bg-terracotta-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
