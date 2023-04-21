const express = require('express');
const data = require('./data.ts');
const logger = require('pino-http');
const app = express();


// GET all info
app.get('/api/info', async (_req, res) => {
  try {

    const info = await data.info[0];
    if (info.length > 0) {
      return res.status(200).json(info);
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET info by ID
app.get('/api/info/:id', async (req, res) => {
  try {
    logger(req, res);

    const { id } = req.params;
    const info = await data.info[0].find((item) => item.id === id);
    if (info) {
      return res.status(200).json(info);
    } else {
      return res.status(204).end();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(5000, () => {

  console.log('Server is running on port 5000');
});
