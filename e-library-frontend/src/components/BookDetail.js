// src/components/BookDetail.jsx
import React from 'react';

const BookDetail = ({ book }) => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Publication Date: {book.publicationDate}</p>
      <p>{book.isAvailable ? 'Available' : 'Borrowed'}</p>
      <button className="bg-green-500 text-white px-4 py-2 mt-4">
        {book.isAvailable ? 'Borrow' : 'Return'}
      </button>
    </div>
  );
};

export default BookDetail;
