const sqlite3 = require('sqlite3');

// Create a database connection
const db = new sqlite3.Database('database.sqlite');

// Create the items table
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Barcode TEXT UNIQUE,
    Name TEXT,
    Price DECIMAL(10, 2)
  )
`);

module.exports = db;