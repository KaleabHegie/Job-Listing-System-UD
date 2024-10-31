const express = require('express');
const router = express.Router();
const { login, currentUser } = require('../controllers/authController');
const {validateToken} = require('../middleware/validateTokenHandler'); // Ensure the path is correct

// Login route
router.route('/login').post(login);

// Current user route (consider renaming to `/current` for brevity)
router.route('/current').get(validateToken, currentUser);

module.exports = router;
