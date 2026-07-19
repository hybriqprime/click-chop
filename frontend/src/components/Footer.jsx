const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm">
        <p className="font-bold text-white text-lg mb-2">Click-Chop</p>
        <p>Full-stack food ordering & management system</p>
        <p className="mt-4 text-gray-500">
          &copy; {new Date().getFullYear()} Click-Chop. PORA Tech Academy Capstone, Cohort 7.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
