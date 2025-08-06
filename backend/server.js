// Backend server for asconsultantsllc
// Simple Node/Express API to accept inquiry submissions from the React frontend.
// Run with:  node server.js   (port 5000 by default)

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_, res) => {
  res.send('asconsultantsllc backend running');
});

// POST /api/inquiry → receive inquiry information from the website form
app.post('/api/inquiry', (req, res) => {
  const inquiry = req.body;
  console.log('👉 Received inquiry', inquiry);

  /*
    In production you might:
      1. Save inquiry in a database (MySQL, PostgreSQL, MongoDB, etc.)
      2. Send email notifications (SendGrid, SES, Mailgun, etc.)
  */

  return res.status(200).json({ status: 'success', message: 'Inquiry received successfully' });
});

app.listen(PORT, () => {
  console.log(`🚀 asconsultantsllc backend listening on http://localhost:${PORT}`);
});
