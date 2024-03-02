
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const port = 8000;

app.use(bodyParser.json());

// Endpoint for barcode scanning
app.post('/scan', (req, res) => {
  const { barcode } = req.body;

  db.get('SELECT * FROM items WHERE barcode = ?', [barcode], (err, itemRow) => {
    if (err){
        return res.status(500).json({error: "Server Error"});
    }

    if (!itemRow) {
      // need to add an add update item row
        return res.status(404).json({error: 'Item not found'});
    }

    db.all('SELECT stores.Name as StoreName, prices.Price, prices.Timestamp' +
    'FROM prices' +
    'JOIN stores on prices.StoreID = stores.ID'+
    'WHERE prices.ItemID = ?' +
    'GROUP BY prices.StoreID', [itemRow.ID],(pricesErr, priceRows) => {
      if (priceErr) {
        return res.status(500).json({ error: 'Error querying prices'});
      }
      return res.status(200).json({
        item: {
          ID: itemRow.ID,
          Barcode: itemRow.barcode,
          Name: itemRow.Name,
        },
        prices: priceRows,
      });

    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
