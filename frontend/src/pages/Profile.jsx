import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/users/profile');
        reset({ name: data.user.name, phone: data.user.phone || '' });
      } catch (err) {
        setError('Could not load your profile.');
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const onSubmit = async (formData) => {
    setMessage('');
    setError('');
    setLoading(true);
    try {
      await api.put('/users/profile', formData);
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not update your profile.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center py-16 text-gray-500">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      {message && (
        <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4 text-sm text-gray-500">
        Email: <span className="text-gray-800">{user?.email}</span> (cannot be changed)
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            {...register('phone')}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-terracotta-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-terracotta-600 text-white py-2 rounded-lg hover:bg-terracotta-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;