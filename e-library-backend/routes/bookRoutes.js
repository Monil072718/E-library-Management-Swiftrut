// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book'); // Make sure this is correctly defined

// Route to add a new book
// Route to add a new book
router.post('/', async (req, res) => {
    const { title, author, genre, publicationDate, isAvailable } = req.body;
    
    console.log('Received data:', req.body); // Log request body to debug
  
    try {
      const newBook = new Book({
        title,
        author,
        genre,
        publicationDate,
        isAvailable: isAvailable !== undefined ? isAvailable : true,
      });
  
      const book = await newBook.save();
      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// Route to get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find(); // Fetch all books from the database
    res.json(books); // Send the books as a JSON response
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router; // Export the router
