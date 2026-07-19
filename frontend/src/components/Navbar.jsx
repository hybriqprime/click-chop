import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Click-Chop
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/menu" className="hover:text-orange-600">Menu</Link>
          <Link to="/about" className="hover:text-orange-600">About</Link>
          <Link to="/contact" className="hover:text-orange-600">Contact</Link>
          <Link to="/cart" className="hover:text-orange-600">Cart</Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-orange-600">My Orders</Link>
              <Link to="/profile" className="hover:text-orange-600">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-orange-600">Admin</Link>
              )}
              <button
                onClick={logout}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-orange-600">Login</Link>
              <Link
                to="/register"
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
