const express = require('express');
const ratingRouter = require('./routes/rating');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/rating', ratingRouter);

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Rating Excel API listening on port ${PORT}`);
});
