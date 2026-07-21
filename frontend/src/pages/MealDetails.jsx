import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const { data } = await api.get(`/menu/${id}`);
        setMeal(data.menuItem);
      } catch (err) {
        setError('Meal not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex((item) => item.menuItem === meal._id);

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({
        menuItem: meal._id,
        name: meal.name,
        price: meal.price,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <p className="text-center py-16 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center py-16 text-red-600">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate('/menu')}
        className="text-terracotta-600 mb-6 hover:underline"
      >
        &larr; Back to Menu
      </button>

      {meal.imageUrl && (
        <img
          src={meal.imageUrl}
          alt={meal.name}
          className="w-full h-64 object-cover rounded-xl mb-6"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{meal.name}</h1>
      <span className="inline-block text-xs bg-gray-100 px-3 py-1 rounded-full mb-4">
        {meal.category}
      </span>
      <p className="text-gray-600 mb-4">{meal.description}</p>
      <p className="text-2xl font-bold text-terracotta-600 mb-6">
        ₦{meal.price.toLocaleString()}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <label className="text-sm font-medium">Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-20 border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      <button
        onClick={handleAddToCart}
        disabled={!meal.isAvailable}
        className="bg-terracotta-600 text-white px-8 py-3 rounded-lg hover:bg-terracotta-700 disabled:opacity-50"
      >
        {meal.isAvailable ? (added ? 'Added to Cart ✓' : 'Add to Cart') : 'Currently Unavailable'}
      </button>
    </div>
  );
};

export default MealDetails;
