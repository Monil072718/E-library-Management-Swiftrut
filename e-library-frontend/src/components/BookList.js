import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Check if user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
        try {
          const res = await API.get('/books'); // Ensure this points to the correct route
          setBooks(res.data);
        } catch (err) {
          console.error('Error fetching books:', err.response ? err.response.data : err.message);
          setError(err.message); // Handle the error
        }
      };
    fetchBooks();
  }, []);

  const borrowBook = async (bookId) => {
    try {
      await API.put(`/books/borrow/${bookId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Book borrowed successfully');
      window.location.reload();
    } catch (err) {
      setError('Unable to borrow the book');
    }
  };

  const returnBook = async (bookId) => {
    try {
      await API.put(`/books/return/${bookId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Book returned successfully');
      window.location.reload();
    } catch (err) {
      setError('Unable to return the book');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">E-Library Book List</h1>
      {error && <p className="text-red-500 text-center">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            {book.imageUrl && (
              <img
                src={`http://localhost:5000${book.imageUrl}`}
                alt={book.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-2xl font-semibold text-gray-800">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className={`text-sm mt-2 ${book.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {book.quantity > 0 ? `${book.quantity} in stock` : 'The book is out of stock'}
              </p>
              {token && book.quantity > 0 && (
                <button
                  onClick={() => borrowBook(book._id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Borrow
                </button>
              )}
              {token && book.quantity < 1 && (
                <button
                  onClick={() => returnBook(book._id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                >
                  Return
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
