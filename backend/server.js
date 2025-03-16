// express, cors, 
const express = require('express');
const cors = require('cors'); // Cors is the middleware for the communication with the frontend.
const threadRoutes = require('./routes/threadRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON requests


// Routes
app.use('/api/threads', threadRoutes);

// Set port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
