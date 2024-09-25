// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// Import your Book model
const Book = require('../models/Book');

// Route to add a book with an image upload
router.post('/add-book', upload.single('image'), async (req, res) => {
  const { title, author, genre, publicationDate, isAvailable } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Save the file path if uploaded
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

module.exports = router;
