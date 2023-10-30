const express = require('express');
const handleRegister = require('../controller/controller.register');
const router = express.Router();

// Route for user registration
router.post('/register', handleRegister);

module.exports = router;