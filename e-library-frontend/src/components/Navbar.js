// src/components/Navbar.jsx
import React, { useState } from 'react'; // Import useState
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [open, setOpen] = useState(false); // Define state to toggle mobile menu
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link to="/books">E-Library</Link> {/* Brand/Logo */}
        </div>
        <div className="block lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setOpen(!open)} // Toggle mobile menu
          >
            {/* Mobile menu icon (hamburger) */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
        <ul className={`lg:flex space-x-4 text-white ${open ? 'block' : 'hidden'} lg:block`}>
          <li>
            <Link
              to="/books"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Books
            </Link>
          </li>
          {!token && (
            <>
              <li>
                <Link
                  to="/register"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </li>
            </>
          )}
          {token && (
            <>
              <li>
                <Link
                  to="/add-book"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Book
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
