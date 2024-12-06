const express = require('express');
const {
    createJobSector,
    getAllJobSectors,
    getJobSectorById,
    updateJobSector,
    deleteJobSector,
} = require('../controllers/jobSectorController');

const router = express.Router();


router.post('/create_job_sector', createJobSector);
router.get('/get_all_job_sectors', getAllJobSectors);
router.get('/get_job_sector/:id', getJobSectorById);
router.put('/update_job_sector/:id', updateJobSector);
router.delete('/delete_job_sector/:id', deleteJobSector);

module.exports = router;
