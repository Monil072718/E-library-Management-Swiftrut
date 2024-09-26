const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const Book = require('../models/Book');

// Route to add a book with image upload
router.post('/add-book', upload.single('image'), async (req, res) => {
  const { title, author, genre, publicationDate, isAvailable, quantity } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      quantity: quantity || 1,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null
    });

    const book = await newBook.save();
    res.json(book);
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
        imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined
      },
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to delete a book
router.delete('/delete-book/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Book deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to borrow a book
router.put('/borrow/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book || book.quantity === 0) {
      return res.status(400).json({ msg: 'The book is out of stock' });
    }

    book.quantity -= 1;
    await book.save();
    res.json({ msg: 'Book borrowed successfully', book });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to return a book
router.put('/return/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(400).json({ msg: 'Book not found' });
    }

    book.quantity += 1;
    await book.save();
    res.json({ msg: 'Book returned successfully', book });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to get all books
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
