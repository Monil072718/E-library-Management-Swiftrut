// src/components/BookList.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get('/books'); // API call
        console.log('Response:', res); // Log the response to check structure
        setBooks(res.data); // Ensure res.data exists and set it to state
      } catch (err) {
        console.error('Error fetching books:', err.response ? err.response.data : err.message);
        setError(err.message); // Set error message if request fails
      }
    };
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      {error && <p>Error: {error}</p>} {/* Display error message if there's an issue */}
      <ul>
        {books.map((book) => (
          <li key={book._id}>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            <p>{book.isAvailable ? 'Available' : 'Borrowed'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
