
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// Endpoint for barcode scanning
app.post('/scan', (req, res) => {
  const { barcode, name, price } = req.body;

  db.get('SELECT * FROM items WHERE barcode = ?', [barcode], (err, row) => {
    // Rest of your scanning and database update logic
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
