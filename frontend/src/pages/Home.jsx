import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await api.get('/menu');
        setFeatured(data.menuItems.slice(0, 6));
      } catch (err) {
        // fail silently, home page still works without featured meals
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-terracotta-600 to-terracotta-500 text-white">
        <div className="max-w-6xl mx-auto px-4 py-24 text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            Great Food, Delivered Fast
          </h1>
          <p className="text-lg sm:text-xl text-terracotta-50 mb-8 max-w-2xl mx-auto">
            From smoky jollof rice to rich soups and cold drinks - order your favorites
            and track every step, right to your door.
          </p>
          <Link
            to="/menu"
            className="inline-block bg-white text-terracotta-600 font-bold px-8 py-3 rounded-lg hover:bg-terracotta-50 transition"
          >
            Browse the Menu
          </Link>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Featured Meals</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item) => (
              <Link
                to={`/menu/${item._id}`}
                key={item._id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition block"
              >
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{item.description}</p>
                <span className="text-terracotta-600 font-bold">₦{item.price.toLocaleString()}</span>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/menu" className="text-terracotta-600 font-medium hover:underline">
            See the Full Menu &rarr;
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Hungry Already?</h2>
          <p className="text-gray-300 mb-8">Create an account and place your first order in minutes.</p>
          <Link
            to="/register"
            className="inline-block bg-terracotta-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-terracotta-700 transition"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;