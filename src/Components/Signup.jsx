import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setuser } from '../Redux/Authslice';
import authService from '../Appwrite/auth';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      // 1. Create user account
      await authService.createaccount(form);

      // 2. Login after account creation
      await authService.login({
        email: form.email,
        password: form.password
      });

      // 3. Get user info from Appwrite
      const userData = await authService.getcurrentuser();

      // 4. Update redux state and localStorage
      dispatch(setuser(userData));
      localStorage.setItem('user', JSON.stringify(userData));

      // 5. Redirect
      navigate('/');
    } catch (error) {
      console.error("Error in Signup", error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">Create an Account</h2>

        <form onSubmit={handleSignUp} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring--500"
            />
          </div>

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
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-red-600 hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
