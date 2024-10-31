const express = require('express');
const router = express.Router();
const {
    createExperience,
    getExperiences,
    getSingleExperience,
    updateExperience,
    deleteExperience
} = require('../controllers/experiencesController');
const { validateCandidate } = require('../middleware/validateTokenHandler');

router.route('/')
    .post( validateCandidate , createExperience)         
    .get( validateCandidate , getExperiences);           

router.route('/:experienceId')
    .get( validateCandidate , getSingleExperience)             
    .put( validateCandidate , updateExperience)       
    .delete(validateCandidate ,deleteExperience);     

module.exports = router;
