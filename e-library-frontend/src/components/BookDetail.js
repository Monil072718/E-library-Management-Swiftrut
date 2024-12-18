import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api';

const BookDetail = ({ book, userId }) => {
  const navigate = useNavigate();

  // Function to handle book deletion
  const handleDelete = async () => {
    try {
      await API.delete(`/books/${book._id}`, {
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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Publication Date: {new Date(book.publicationDate).toLocaleDateString()}</p>
      <p>{book.isAvailable ? 'Available' : 'Borrowed'}</p>
      <button className="bg-green-500 text-white px-4 py-2 mt-4">
        {book.isAvailable ? 'Borrow' : 'Return'}
      </button>

      {/* Show Edit and Delete buttons only if the logged-in user added the book */}
      {userId === book.publishedBy?.toString() && (
        <div className="mt-4">
          <button
            onClick={() => navigate(`/edit-book/${book._id}`)}
            className="bg-yellow-500 text-white px-4 py-2 mr-4"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
