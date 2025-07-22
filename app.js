require('dotenv').config();
const express = require('express');
const ratingRouter = require('./routes/rating');

const app = express();
app.use(express.json());
app.use('/api/rating', ratingRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));