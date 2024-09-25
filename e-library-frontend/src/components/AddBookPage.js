// src/components/AddBookPage.jsx
import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publicationDate: '',
    isAvailable: true,
  });

  const { title, author, genre, publicationDate, isAvailable } = formData;
  const navigate = useNavigate(); // To redirect after adding the book

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form with data:', formData); // Add this log to check formData
    try {
      await API.post('/books', formData); // API call to add book
      toast.success('Book added successfully!');
      navigate('/books'); // Redirect to book list after successful addition
    } catch (err) {
      toast.error('Error adding book!');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Genre:</label>
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Publication Date:</label>
          <input
            type="date"
            name="publicationDate"
            value={publicationDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Is Available:</label>
          <select
            name="isAvailable"
            value={isAvailable}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
