import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200 pb-4">
        <Link to="/admin" className="text-terracotta-600 hover:underline font-medium">
          Dashboard
        </Link>
        <Link to="/admin/menu" className="text-terracotta-600 hover:underline font-medium">
          Manage Menu
        </Link>
        <Link to="/admin/orders" className="text-terracotta-600 hover:underline font-medium">
          Manage Orders
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default AdminLayout;