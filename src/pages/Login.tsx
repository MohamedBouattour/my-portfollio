import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login({isAuthenticated,isAdmin}:{isAuthenticated:boolean,isAdmin:boolean}) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigation = useNavigate()

  function handleChange(e: any) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if(isAdmin){
      navigation('/admin')
    }else {
      navigation('/visitor')
    }
    
    if (
      formData.email === 'admin@example.com' &&
      formData.password === 'admin123'
    ) {
      window.location.href = '/admin';
    } else {
      setError('Invalid email or password');
    }
  }

  if(isAuthenticated){
    if(isAdmin){
      return <Navigate to='/admin' />
    }
    return <Navigate to='/visitor' />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Admin Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm">
          <p className="font-bold text-gray-800 mb-2">Demo Credentials:</p>
          <p className="text-gray-700">Email: admin@example.com</p>
          <p className="text-gray-700">Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
