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
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
