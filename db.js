const sqlite3 = require('sqlite3');

// Create a database connection
const db = new sqlite3.Database('database.sqlite');

// Create the items table
db.run(`
  CREATE TABLE IF NOT EXISTS items (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    Barcode TEXT UNIQUE,
    Name TEXT,
  )

  CREATE TABLE IF NOT EXIST store (
    ID INTEGER PRIMARY KEY AUTOINCREMENT
    Name TEXT Unique,
  )

  CREATE TABLE IF NOT EXIST prices (
    ID INTEGER PRIMARY KEY AUTOINCREMENT
    ItemID INTEGER,
    StoreID INTEGER,
    Price DECIMAL(10,2)
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREGIN KEY (ItemID) References item (ID),
    FOREGIN KEY (StoreID) References stores (ID)
  )

`);

module.exports = db;