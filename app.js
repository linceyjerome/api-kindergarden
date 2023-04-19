const express = require('express');
const data = require('./data.ts');

const app = express();

app.get('/api/info/:id', (req, res) => {
  const { id } = req.params;
  const info = data.info[0].find((item) => item.id === id);
  console.log(data.info.length)
  if (info) {
    return res.status(200).json(info);
  } else {
    return res
      .status(404)
      .json({ message: `item with id: ${id} not found. Check data` });
  }
});

app.get('/api/info', (req, res) => {
  const info = data.info[0];

  if (info.length > 0) {
    return res.status(200).json(info);
  } else {
    return res
      .status(404)
      .json({ message: `No items found. Check data` });
  }
});


app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
