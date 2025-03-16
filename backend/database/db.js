const Database = require('better-sqlite3');

// Create or open the database
const db = new Database('./forum.db', { verbose: console.log });

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS threads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`
).run();

// Initialize the responses table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    thread_id INTEGER,
    guest_name TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (thread_id) REFERENCES threads(id)
  )
`
).run();

module.exports = db;
