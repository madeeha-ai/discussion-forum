const db = require('../database/db');

// Create a new thread with category
const createThread = (req, res) => {
  const { title, content, category } = req.body; // Get category from request body
  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ error: 'Title, content, and category are required' });
  }

  const stmt = db.prepare(
    'INSERT INTO threads (title, content, category) VALUES (?, ?, ?)'
  );
  stmt.run(title, content, category); // Insert the thread with category
  res.status(201).json({ message: 'Thread created' });
};

// Get all threads with filtering and sorting options

const getThreads = (req, res) => {
  const { sort, keyword, category } = req.query;
  let query = `
        SELECT threads.*, 
               COALESCE(COUNT(responses.id), 0) AS response_count, 
               COALESCE(MAX(responses.created_at), threads.created_at) AS last_activity
        FROM threads
        LEFT JOIN responses ON threads.id = responses.thread_id
        WHERE 1 = 1`;
  let params = [];

  if (keyword) {
    query += ' AND (threads.title LIKE ? OR threads.content LIKE ?)';
    const keywordPattern = `%${keyword}%`;
    params.push(keywordPattern, keywordPattern);
  }

  if (category) {
    query += ' AND threads.category = ?';
    params.push(category);
  }

  query += ' GROUP BY threads.id';

  if (sort === 'latest') {
    query += ' ORDER BY last_activity DESC';
  } else if (sort === 'responses') {
    query += ' ORDER BY response_count DESC';
  } else {
    query += ' ORDER BY threads.created_at DESC';
  }

  const threadsQuery = db.prepare(query);
  const result = threadsQuery.all(...params);
  res.json(result);
};

// Get a single thread by ID
const getThreadById = (req, res) => {
  const { id } = req.params;
  const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }
  const responses = db
    .prepare(
      'SELECT * FROM responses WHERE thread_id = ? ORDER BY created_at DESC'
    )
    .all(id);
  res.json({ thread, responses });
};

// Edit a thread
const editThread = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
  if (!thread) {
    return res.status(404).json({ error: 'Thread not found' });
  }

  const stmt = db.prepare(
    'UPDATE threads SET title = ?, content = ? WHERE id = ?'
  );
  stmt.run(title, content, id);
  res.status(200).json({ message: 'Thread updated' });
};

// Delete a thread
const deleteThread = (req, res) => {
  const { id } = req.params;

  // console.log("Attempting to delete thread with ID:", id); // Debugging

  try {
    // Check if the thread exists before attempting to delete it
    const thread = db.prepare('SELECT * FROM threads WHERE id = ?').get(id);
    if (!thread) {
      // console.error("Error: Thread not found!");
      return res.status(404).json({ error: 'Thread not found' });
    }

    // First, delete all responses related to this thread to avoid foreign key issues
    db.prepare('DELETE FROM responses WHERE thread_id = ?').run(id);
    // console.log("Responses deleted for thread:", id);

    // Now delete the thread itself
    db.prepare('DELETE FROM threads WHERE id = ?').run(id);
    // console.log("Thread deleted successfully:", id);

    res.status(200).json({ message: 'Thread deleted successfully' });
  } catch (error) {
    // console.error("Error deleting thread:", error); // Log the actual error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a response to a thread
const createResponse = (req, res) => {
  const { thread_id, guest_name, message } = req.body;
  if (!thread_id || !guest_name || !message) {
    return res
      .status(400)
      .json({ error: 'Thread ID, guest name, and message are required' });
  }
  const stmt = db.prepare(
    'INSERT INTO responses (thread_id, guest_name, message) VALUES (?, ?, ?)'
  );
  stmt.run(thread_id, guest_name, message);
  res.status(201).json({ message: 'Response created' });
};

const editResponse = (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const response = db.prepare('SELECT * FROM responses WHERE id = ?').get(id);
  if (!response) {
    return res.status(404).json({ error: 'Response not found' });
  }

  const stmt = db.prepare('UPDATE responses SET message = ? WHERE id = ?');
  stmt.run(message, id);
  res.status(200).json({ message: 'Response updated' });
};

const deleteResponse = (req, res) => {
  const { id } = req.params;

  const response = db.prepare('SELECT * FROM responses WHERE id = ?').get(id);
  if (!response) {
    return res.status(404).json({ error: 'Response not found' });
  }

  const stmt = db.prepare('DELETE FROM responses WHERE id = ?');
  stmt.run(id);
  res.status(200).json({ message: 'Response deleted' });
};

// Other methods (edit, delete, etc.) remain unchanged

module.exports = {
  getThreads,
  getThreadById,
  createThread,
  editThread,
  deleteThread,
  createResponse,
  editResponse,
  deleteResponse,
};
