// src/components/Login.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { toast } from 'react-toastify';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate(); // Create a navigate function

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token); // Store the token
      toast.success('Login successful!'); // Show success message
      navigate('/books'); // Redirect to the home page after successful login
    } catch (err) {
      toast.error('Error logging in!'); // Show error message
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
