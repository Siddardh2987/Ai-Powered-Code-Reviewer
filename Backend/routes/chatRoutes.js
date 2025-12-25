const express = require('express');
const router = express.Router();
const { handleChatMessage } = require('../controllers/chatController');

// NO AUTH MIDDLEWARE - Direct access!
router.post('/', handleChatMessage); // ✅ No authMiddleware

module.exports = router;