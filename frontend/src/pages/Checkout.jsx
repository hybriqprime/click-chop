import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    const stored = JSON.parse(localStorage.getItem('cart') || '[]');
    if (stored.length === 0) {
      navigate('/cart');
      return;
    }
    setCart(stored);
  }, [user, navigate]);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!deliveryAddress.trim()) {
      setError('Please enter a delivery address.');
      return;
    }

    setLoading(true);
    try {
      const items = cart.map((item) => ({
        menuItem: item.menuItem,
        quantity: item.quantity,
      }));

      await api.post('/orders', { items, deliveryAddress });

      localStorage.removeItem('cart');
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not place your order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="border border-gray-200 rounded-xl p-4 mb-6">
        <h2 className="font-semibold mb-3">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.menuItem} className="flex justify-between text-sm mb-2">
            <span>{item.name} x{item.quantity}</span>
            <span>₦{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t pt-3 mt-3">
          <span>Total</span>
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Delivery Address
        </label>
        <textarea
          value={deliveryAddress}
          onChange={(e) => setDeliveryAddress(e.target.value)}
          rows={3}
          placeholder="e.g. 12 Admiralty Way, Lekki, Lagos"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 disabled:opacity-50"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
