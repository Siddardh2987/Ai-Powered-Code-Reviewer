const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ Parse JSON body
app.use(express.urlencoded({ extended: true }));

// Import Routes
const chatRoutes = require('./routes/chatRoutes');

// Use Routes (NO AUTH REQUIRED!)
app.use('/api/chat', chatRoutes); // ✅ Direct access, no authentication

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: '🔍 AI Code Reviewer API is running!',
    status: 'online',
    endpoints: {
      chat: 'POST /api/chat - No authentication required'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API endpoint: http://localhost:${PORT}/api/chat`);
  console.log(`✅ No authentication required!`);
});