const mongoose = require('mongoose');

// Book schema
const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number, // Number of available copies
    default: 1
  },
  imageUrl: {
    type: String // Store image file path
  }
});

// Middleware to update availability based on stock quantity
BookSchema.pre('save', function(next) {
  if (this.quantity > 0) {
    this.isAvailable = true;
  } else {
    this.isAvailable = false;
  }
  next();
});

module.exports = mongoose.model('Book', BookSchema);
