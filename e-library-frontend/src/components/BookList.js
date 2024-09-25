// src/components/BookList.jsx
import React, { useState, useEffect } from 'react';
import API from '../api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get('/books'); // API call to get books
        setBooks(res.data); // Set the books from the backend
      } catch (err) {
        console.error('Error fetching books:', err.response ? err.response.data : err.message);
        setError(err.message); // Handle errors
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">E-Library Book List</h1>
      {error && <p className="text-red-500 text-center">Error: {error}</p>} {/* Display error message if there's an issue */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {/* Display the image */}
            {book.imageUrl && (
              <img
                src={`http://localhost:5000${book.imageUrl}`} // URL of the uploaded image
                alt={book.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className={`text-sm mt-2 ${book.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {book.isAvailable ? 'Available' : 'Borrowed'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
