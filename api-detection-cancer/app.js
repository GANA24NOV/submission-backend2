const express = require('express');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

const app = express();

// Middleware untuk menangani file
app.use(express.raw({ type: 'image/*', limit: '1mb' }));

// Endpoint POST untuk /predict
app.post('/predict', (req, res) => {
  if (!req.body || req.body.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'No file uploaded.',
    });
  }

  // Dummy logic for prediction (replace with your model logic)
  const isCancer = Math.random() > 0.5;
  const id = uuidv4();
  const createdAt = moment().toISOString();

  res.json({
    status: 'success',
    message: 'Model is predicted successfully',
    data: {
      id,
      result: isCancer ? 'Cancer' : 'Non-cancer',
      suggestion: isCancer
        ? 'Segera periksa ke dokter!'
        : 'Penyakit kanker tidak terdeteksi.',
      createdAt,
    },
  });
});

// Error handling for file too large
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      status: 'fail',
      message: 'Payload content length greater than maximum allowed: 1000000',
    });
  }
  next(err);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
