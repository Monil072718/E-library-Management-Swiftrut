// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/books">Books</Link> {/* Everyone can see the book list */}
        </li>
        {!token && (
          <>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li>
              <Link to="/add-book">Add Book</Link> {/* Only logged-in users can see Add Book */}
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
