import React, { useState, useEffect } from 'react';
import API from '../api';
import { Link, useNavigate } from 'react-router-dom';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get('/books');
        setBooks(res.data);
      } catch (err) {
        setError('Error fetching books');
      }
    };
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      await API.put(`/books/borrow/${bookId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Book borrowed successfully!');
      window.location.reload();
    } catch (err) {
      alert('Error borrowing book');
      console.error(err);
    }
  };

  const handleReturn = async (bookId) => {
    try {
      await API.put(`/books/return/${bookId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Book returned successfully!');
      window.location.reload();
    } catch (err) {
      alert('Error returning book');
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">E-Library Book List</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
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
              <p>Genre: {book.genre}</p>
              <p>Quantity: {book.quantity}</p>
              <p>Publication Date: {new Date(book.publicationDate).toLocaleDateString()}</p>
              <p className={`text-sm mt-2 ${book.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {book.isAvailable ? 'Available' : 'Out of Stock'}
              </p>

              {/* View Details Button */}
              <Link
                to={`/books/${book._id}`}
                className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                View Details
              </Link>

              {/* Show Borrow/Return buttons if user is logged in */}
              {localStorage.getItem('token') && (
                <div className="mt-4">
                  {book.isAvailable ? (
                    <button
                      onClick={() => handleBorrow(book._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded"
                    >
                      Borrow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleReturn(book._id)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded"
                    >
                      Return
                    </button>
                  )}
                </div>
              )}

              {/* Show Edit and Delete buttons if the user added the book */}
              {userId === book.publishedBy && (
                <div className="mt-4">
                  <button
                    onClick={() => navigate(`/edit-book/${book._id}`)}
                    className="bg-yellow-500 text-white py-2 px-4 rounded mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => console.log('Delete logic here')}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
