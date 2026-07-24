import logo from '../assets/logo.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
         <img src={logo} alt="Click-Chop" className="h-10" />
        </Link>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700 text-2xl"
          aria-label="Toggle menu"
        >
          {open ? '✕' : '☰'}
        </button>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
          <Link to="/menu" className="hover:text-terracotta-600">Menu</Link>
          <Link to="/about" className="hover:text-terracotta-600">About</Link>
          <Link to="/contact" className="hover:text-terracotta-600">Contact</Link>
          <Link to="/cart" className="hover:text-terracotta-600">Cart</Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-terracotta-600">My Orders</Link>
              <Link to="/profile" className="hover:text-terracotta-600">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-terracotta-600">Admin</Link>
              )}
              <button onClick={logout} className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-terracotta-600">Login</Link>
              <Link to="/register" className="bg-terracotta-600 text-white px-4 py-2 rounded-lg hover:bg-terracotta-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-1 px-4 pb-4 text-sm font-medium text-gray-700">
          <Link to="/menu" onClick={closeMenu} className="py-2 hover:text-terracotta-600">Menu</Link>
          <Link to="/about" onClick={closeMenu} className="py-2 hover:text-terracotta-600">About</Link>
          <Link to="/contact" onClick={closeMenu} className="py-2 hover:text-terracotta-600">Contact</Link>
          <Link to="/cart" onClick={closeMenu} className="py-2 hover:text-terracotta-600">Cart</Link>

          {user ? (
            <>
              <Link to="/orders" onClick={closeMenu} className="py-2 hover:text-terracotta-600">My Orders</Link>
              <Link to="/profile" onClick={closeMenu} className="py-2 hover:text-terracotta-600">Profile</Link>
              {user.role === 'admin' && (
                <Link to="/admin" onClick={closeMenu} className="py-2 hover:text-terracotta-600">Admin</Link>
              )}
              <button
                onClick={() => { logout(); closeMenu(); }}
                className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 text-left mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="py-2 hover:text-terracotta-600">Login</Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-terracotta-600 text-white px-4 py-2 rounded-lg hover:bg-terracotta-700 text-center mt-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;