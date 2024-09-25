// src/components/Register.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate(); // Create a navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData);
      localStorage.setItem('token', res.data.token); // Store the token (optional)
      toast.success('Registration successful!'); // Show success message
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      toast.error('Error registering user!'); // Show error message
      console.error(err.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-md w-full space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center text-gray-800">Register</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition transform hover:scale-105"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
