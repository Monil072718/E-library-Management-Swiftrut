// controllers/bookController.js
const Book = require('../models/Book');
const User = require('../models/User');

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, genre, publicationDate } = req.body;

  try {
    const newBook = new Book({ title, author, genre, publicationDate });
    await newBook.save();
    res.json(newBook);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book || !book.isAvailable) return res.status(400).json({ msg: 'Book not available' });

    const user = await User.findById(req.user.userId);
    user.borrowedBooks.push(book.id);
    book.isAvailable = false;
    book.borrowedBy = user.id;

    await user.save();
    await book.save();

    res.json({ msg: 'Book borrowed successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book || book.isAvailable) return res.status(400).json({ msg: 'Book not borrowed' });

    const user = await User.findById(req.user.userId);
    user.borrowedBooks.pull(book.id);
    book.isAvailable = true;
    book.borrowedBy = null;

    await user.save();
    await book.save();

    res.json({ msg: 'Book returned successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};


// Get all books
exports.getBooks = async (req, res) => {
    try {
      const books = await Book.find(); // Fetch all books from the database
      res.json(books); // Send the books as a JSON response
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  };