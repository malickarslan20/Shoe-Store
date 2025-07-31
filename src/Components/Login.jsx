import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setuser } from '../Redux/Authslice';
import authService from '../Appwrite/auth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux dispatch hook

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Log in the user with Appwrite
      await authService.login({
        email: form.email,
        password: form.password
      });

      // Get the current user details
      const currentUser = await authService.getcurrentuser();

      // Set user in Redux
      dispatch(setuser(currentUser));

      // Optional: Save to localStorage for persistence
      localStorage.setItem('user', JSON.stringify(currentUser));

      // Navigate to home/dashboard
      navigate('/');
    } catch (error) {
      console.error("Error in Login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Login to Your Account</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-red-600 hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
