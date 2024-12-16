const express = require('express');
const applicationController = require('../controllers/applicationController');
const { validateRecruiter, validateCandidate , validateToken , validateRecruiterOrCandidate  } = require('../middleware/validateTokenHandler');
const router = express.Router();

router.post('/apply/:job_id', validateCandidate,    applicationController.createApplication);
router.post('/bookmark/:job_id' , validateCandidate, applicationController.createBookmark);
router.get('/all_applications' , applicationController.getAllApplications);
router.get('/get_application/:id', validateRecruiterOrCandidate , applicationController.getApplicationById);
router.put('/update_application/:id', validateCandidate , applicationController.updateApplicationStatus);
router.delete('/delete_application/:id', validateRecruiterOrCandidate , applicationController.deleteApplication);
router.patch('/update-stat/:id', validateRecruiterOrCandidate , applicationController.updateStat);

module.exports = router;
