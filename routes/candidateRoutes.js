const express = require('express');
const userController = require('../controllers/candidateController');
const router = express.Router();
const { validateAdmin, validateToken } = require('../middleware/validateTokenHandler');

// Route to get user profile
router.get('/profile', validateToken ,userController.getProfile);
router.patch('/edit_profile', validateToken , userController.editProfile);
router.get('/applied_jobs', validateToken, userController.appliedJobs);
router.get('/bookmarked_jobs', validateToken, userController.bookmarkedJobs);

module.exports = router;
