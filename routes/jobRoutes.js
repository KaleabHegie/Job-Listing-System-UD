const express = require('express');
const { createJob, getAllJobs, getJobById, updateJob, deleteJob } = require('../controllers/jobController'); // Adjust path as necessary
const { validateRecruiter,  validateToken } = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/create_job', createJob); // Protected route for creating a job
router.get('/all_jobs', getAllJobs); // Public route for getting all jobs
router.get('/get_job/:id', getJobById); // Public route for getting a job by ID
router.patch('/update_job/:id', updateJob); // Protected route for updating a job
router.delete('/delete_job/:id', deleteJob); // Protected route for deleting a job

module.exports = router;
