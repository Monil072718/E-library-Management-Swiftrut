import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import AddBookPage from './components/AddBookPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<PrivateRoute><AddBookPage /></PrivateRoute>} />
        <Route path="/" element={<BookList />} />
      </Routes>
    </Router>
  );
};

export default App;
