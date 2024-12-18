import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import ViewBook from './components/ViewBook';
import Navbar from './components/Navbar';
import AddBookPage from './components/AddBookPage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:bookId" element={<ViewBook />} /> {/* View Book Route */}
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
