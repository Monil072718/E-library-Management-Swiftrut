// controllers/bookController.js
const Book = require('../models/Book');
const User = require('../models/User');

// Create a new book
// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, genre, publicationDate, isAvailable, quantity } = req.body;
  
  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publicationDate,
      isAvailable: isAvailable !== undefined ? isAvailable : true,
      quantity: quantity || 1, // Default to 1 if no quantity is provided
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      publishedBy: req.user.userId // Save the user who added the book
    });

    const book = await newBook.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book || book.quantity <= 0) {
      return res.status(400).json({ msg: 'The book is out of stock' });
    }

    book.quantity -= 1;
    if (book.quantity === 0) {
      book.isAvailable = false;
    }
    
    await book.save();
    res.json({ msg: 'Book borrowed successfully', book });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(400).json({ msg: 'Book not found' });

    book.quantity += 1;
    if (book.quantity > 0) {
      book.isAvailable = true;
    }

    await book.save();
    res.json({ msg: 'Book returned successfully', book });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

  // Edit Book
exports.updateBook = async (req, res) => {
  const { title, author, genre, publicationDate, isAvailable } = req.body;
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) return res.status(404).json({ msg: 'Book not found' });

    if (book.publishedBy.toString() !== req.user.userId) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publicationDate = publicationDate || book.publicationDate;
    book.isAvailable = isAvailable !== undefined ? isAvailable : book.isAvailable;

    await book.save();
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    // Assuming `publishedBy` is the user who added the book
    if (book.publishedBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized to delete this book' });
    }

    await book.remove();
    res.json({ msg: 'Book deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

