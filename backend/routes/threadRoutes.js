
const express = require('express');
const router = express.Router();
const {
  getThreads,
  getThreadById,
  createThread,
  createResponse,
  editResponse,
  deleteResponse,
  editThread,
  deleteThread,
} = require('../controllers/threadController');

// Route to get all threads
router.get('/', getThreads);

// Route to get a single thread by ID
router.get('/:id', getThreadById);

// Route to create a new thread
router.post('/', createThread);

// Route to create a response to a thread
router.post('/responses', createResponse);

// Route to edit a response by ID
router.put('/responses/:id', editResponse);

// Route to delete a response by ID
router.delete('/responses/:id', deleteResponse);

// Route to edit a thread by ID
router.put('/:id', editThread); // New route to edit thread

// Route to delete a thread by ID
router.delete('/:id', deleteThread); // New route to delete thread

module.exports = router;
