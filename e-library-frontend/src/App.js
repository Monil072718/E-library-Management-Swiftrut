// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import BookList from './components/BookList';
import AddBookPage from './components/AddBookPage';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<BookList />} />
          {/* Protect Add Book Page */}
          <Route path="/add-book" element={<PrivateRoute><AddBookPage /></PrivateRoute>} />
          <Route path="/" element={<BookList />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
