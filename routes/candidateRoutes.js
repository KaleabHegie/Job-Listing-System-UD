const express = require('express');
const userController = require('../controllers/candidateController');
const router = express.Router();
const { validateAdmin, validateToken } = require('../middleware/validateTokenHandler');

// Route to get user profile
router.get('/profile', validateToken ,userController.getProfile);
router.put('/edit_profile', validateToken , userController.editProfile);

module.exports = router;
