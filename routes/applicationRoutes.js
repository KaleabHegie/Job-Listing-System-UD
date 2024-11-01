const express = require('express');
const applicationController = require('../controllers/applicationController');
const { validateRecruiter, validateCandidate , validateToken , validateRecruiterOrCandidate  } = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/apply/:job_id',  validateCandidate , applicationController.createApplication);
router.get('/all_applications', validateRecruiter , applicationController.getAllApplications);
router.get('/get_application/:id', validateRecruiterOrCandidate , applicationController.getApplicationById);
router.put('/update_application/:id', validateCandidate , applicationController.updateApplicationStatus);
router.delete('/delete_application/:id', validateRecruiterOrCandidate , applicationController.deleteApplication);

module.exports = router;
