// src/components/BookForm.jsx
import React, { useState } from 'react';

const BookForm = ({ onSubmit, book = {} }) => {
  const [title, setTitle] = useState(book.title || '');
  const [author, setAuthor] = useState(book.author || '');
  const [genre, setGenre] = useState(book.genre || '');
  const [publicationDate, setPublicationDate] = useState(book.publicationDate || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, genre, publicationDate });
  };

  return (
    <form className="container mx-auto p-6" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block">Title:</label>
        <input
          className="border px-4 py-2 w-full"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block">Author:</label>
        <input
          className="border px-4 py-2 w-full"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block">Genre:</label>
        <input
          className="border px-4 py-2 w-full"
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block">Publication Date:</label>
        <input
          className="border px-4 py-2 w-full"
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2">Submit</button>
    </form>
  );
};

export default BookForm;
