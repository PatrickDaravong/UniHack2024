const sqlite3 = require('sqlite3');

// Create a database connection
const db = new sqlite3.Database('database.sqlite');

// Create the items table
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barcode TEXT UNIQUE,
    name TEXT,
    price REAL
  )
`);

module.exports = db;