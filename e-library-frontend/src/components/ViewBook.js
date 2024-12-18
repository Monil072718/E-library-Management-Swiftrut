import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { toast } from 'react-toastify';

const ViewBook = () => {
  const { bookId } = useParams(); // Get the bookId from the route
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // Get the logged-in user ID from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await API.get(`/books/${bookId}`);
        setBook(res.data); // Set the book data to state
      } catch (err) {
        setError('Book not found or an error occurred.');
        console.error(err.message);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleDelete = async () => {
    try {
      await API.delete(`/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Book deleted successfully!');
      navigate('/books'); // Redirect to the book list after deletion
    } catch (err) {
      toast.error('Error deleting book');
      console.error(err);
    }
  };

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!book) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8">
        {book.imageUrl && (
          <img
            src={`http://localhost:5000${book.imageUrl}`}
            alt={book.title}
            className="w-full h-64 object-cover"
          />
        )}
        <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
        <p className="text-lg mt-2">Author: {book.author}</p>
        <p className="text-lg mt-2">Genre: {book.genre}</p>
        <p className="text-lg mt-2">Quantity: {book.quantity}</p>
        <p className="text-lg mt-2">Publication Date: {new Date(book.publicationDate).toLocaleDateString()}</p>

        {/* Edit and Delete Buttons (visible only if the user added the book) */}
        {userId === book.publishedBy?.toString() && ( // Ensure both values are strings before comparison
          <div className="mt-6">
            <button
              onClick={() => navigate(`/edit-book/${book._id}`)} // Redirect to edit page
              className="bg-yellow-500 text-white py-2 px-4 rounded mr-4"
            >
              Edit
            </button>
            <button
              onClick={handleDelete} // Delete the book
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBook;
