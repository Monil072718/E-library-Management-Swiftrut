const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Assuming you have a MongoDB connection setup
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');


dotenv.config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');

// Mount the routes
app.use('/api/auth', authRoutes); // Make sure '/api/auth' is properly mounted
app.use('/api/books', bookRoutes); // Ensure the /api/books route is used here

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
