const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Book = require('../models/Book');
const { deleteBook, updateBook, getBooks, borrowBook, returnBook } = require('../controllers/bookController'); // Correct imports
const { authMiddleware } = require('../middleware/authMiddleware'); // Authentication middleware

// Route to add a book with image upload
router.post('/add-book', upload.single('image'), async (req, res) => {
  const { title, author, genre, publicationDate, isAvailable } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null, // Ensure imageUrl is set correctly
    });

    const book = await newBook.save();
    res.json(book); // Send the saved book object with the image URL
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to update/edit a book
router.put('/edit-book/:id', upload.single('image'), async (req, res) => {
  const { title, author, genre, publicationDate, isAvailable, quantity } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        genre,
        publicationDate,
        isAvailable,
        quantity,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to delete a book (deleteBook callback is used here)
router.delete('/:bookId', authMiddleware, deleteBook);

// Route to borrow a book
router.put('/borrow/:id', borrowBook);

// Route to return a book
router.put('/return/:id', returnBook);

// Route to get all books
router.get('/', getBooks);
router.delete('/:bookId', authMiddleware, deleteBook);

// Route to get a book by id
router.get('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
