import { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '', description: '', price: '', category: '', imageUrl: '', isAvailable: true,
  });
  const [showForm, setShowForm] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/menu');
      setMenuItems(data.menuItems);
    } catch (err) {
      setError('Could not load menu items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const resetForm = () => {
    setForm({ name: '', description: '', price: '', category: '', imageUrl: '', isAvailable: true });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl || '',
      isAvailable: item.isAvailable,
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this menu item?')) return;
    try {
      await api.delete(`/menu/${id}`);
      fetchMenu();
    } catch (err) {
      alert('Could not delete this item.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = { ...form, price: Number(form.price) };
      if (editingId) {
        await api.put(`/menu/${editingId}`, payload);
      } else {
        await api.post('/menu', payload);
      }
      resetForm();
      fetchMenu();
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save this item.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage Menu</h2>
        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="bg-terracotta-600 text-white px-4 py-2 rounded-lg hover:bg-terracotta-700"
        >
          {showForm ? 'Cancel' : '+ Add Menu Item'}
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      {showForm && (
        <form onSubmit={handleSubmit} className="border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
          <input
            type="text" placeholder="Name" required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <textarea
            placeholder="Description" required rows={2}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="number" placeholder="Price" required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="text" placeholder="Category" required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <input
            type="text" placeholder="Image URL (optional)"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.isAvailable}
              onChange={(e) => setForm({ ...form, isAvailable: e.target.checked })}
            />
            Available
          </label>
          <button type="submit" className="bg-terracotta-600 text-white px-6 py-2 rounded-lg hover:bg-terracotta-700">
            {editingId ? 'Update Item' : 'Create Item'}
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-3">
          {menuItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between border border-gray-200 rounded-xl p-4">
              <div>
                <h3 className="font-semibold">{item.name} {!item.isAvailable && <span className="text-xs text-red-500">(Unavailable)</span>}</h3>
                <p className="text-sm text-gray-500">{item.category} · ₦{item.price.toLocaleString()}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(item)} className="text-terracotta-600 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMenu;