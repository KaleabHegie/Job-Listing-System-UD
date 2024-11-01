const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();
const { validateAdmin, validateToken } = require('../middleware/validateTokenHandler');


router.post('/register_recruiter',  validateAdmin,adminController.registerRecruiter);
router.get('/all_users', validateAdmin,  adminController.getAllUsers);
router.get('/get_user/:id', validateAdmin,  adminController.getUserById);
router.get('/all_candidates', validateAdmin,  adminController.getAllCandidates);
router.get('/get_candidate/:id', validateAdmin,  adminController.getCandidateById);
router.patch('/deactivate_user/:id/deactivate', validateAdmin,  adminController.deactivateUser);
router.patch('/activate_user/:id/activate', validateAdmin,  adminController.activateUser);

module.exports = router;
