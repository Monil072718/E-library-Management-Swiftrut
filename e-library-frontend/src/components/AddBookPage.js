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
    image: null, // For image file
  });

  const { title, author, genre, publicationDate, isAvailable, image } = formData;
  const navigate = useNavigate(); // To redirect after adding the book

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] }); // Set the selected image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData(); // Use FormData to send files
    formDataToSend.append('title', title);
    formDataToSend.append('author', author);
    formDataToSend.append('genre', genre);
    formDataToSend.append('publicationDate', publicationDate);
    formDataToSend.append('isAvailable', isAvailable);
    if (image) {
      formDataToSend.append('image', image); // Append image if it exists
    }

    try {
      await API.post('/books/add-book', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });
      toast.success('Book added successfully!');
      navigate('/books'); // Redirect to book list after successful addition
    } catch (err) {
      toast.error('Error adding book!');
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Add a New Book</h1>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter book title"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Author</label>
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter author name"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Genre</label>
            <input
              type="text"
              name="genre"
              value={genre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter genre"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Publication Date</label>
            <input
              type="date"
              name="publicationDate"
              value={publicationDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Availability</label>
            <select
              name="isAvailable"
              value={isAvailable}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={true}>Available</option>
              <option value={false}>Not Available</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
         
            >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBookPage;
