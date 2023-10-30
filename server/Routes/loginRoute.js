const express = require('express');
const router = express.Router();
const handleLogin = require('../controller/controller.login')

// Route for user login
router.post('/login', handleLogin);

module.exports = router;