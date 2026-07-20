import { useState, useEffect } from 'react';
import api from '../services/api';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const fetchMenu = async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (search) params.search = search;
      if (category) params.category = category;

      const { data } = await api.get('/menu', { params });
      setMenuItems(data.menuItems);
    } catch (err) {
      setError('Could not load the menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMenu();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Our Menu</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Search meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-40 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-gray-500">Loading menu...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && menuItems.length === 0 && (
        <p className="text-gray-500">No menu items found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div key={item._id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            )}
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-500 text-sm mb-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-orange-600 font-bold">₦{item.price.toLocaleString()}</span>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">{item.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
