const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const items = ['Apple', 'Banana', 'Orange'];

app.delete('/remove-item', (req, res) => {
    const { name } = req.body; // Get the item name from the request body
  
    if (!name) {
      return res.status(400).json({ error: "Item name is required" });
    }
  
    // Find the index of the item to remove
    const index = items.indexOf(name);
  
    if (index !== -1) {
      // Item found, remove it from the array
      items.splice(index, 1);
      res.json({ message: `${name} removed`, items });
    } else {
      res.status(404).json({ error: `${name} not found in the list` });
    }
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
})

app.get('/', (req, res) => {
    res.send('Hello, World! DAMN');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});