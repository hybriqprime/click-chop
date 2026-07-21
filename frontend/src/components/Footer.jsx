import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-white text-lg mb-2">Click-Chop</p>
          <p className="text-sm text-gray-400">
            Great food, ordered fast, delivered fresh.
          </p>
        </div>
        <div>
          <p className="font-semibold text-white mb-2 text-sm">Quick Links</p>
          <div className="flex flex-col gap-1 text-sm">
            <Link to="/menu" className="hover:text-terracotta-400">Menu</Link>
            <Link to="/about" className="hover:text-terracotta-400">About</Link>
            <Link to="/contact" className="hover:text-terracotta-400">Contact</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white mb-2 text-sm">Contact</p>
          <p className="text-sm text-gray-400">hello@clickchop.com</p>
          <p className="text-sm text-gray-400">+234 801 234 5678</p>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Click-Chop. PORA Tech Academy Capstone, Cohort 7.
      </div>
    </footer>
  );
};

export default Footer;
