// app.js
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Connect Database
connectDB();

app.use(cors());

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/books', require('./routes/bookRoutes'));

// Set up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
