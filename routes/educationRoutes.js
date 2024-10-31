const express = require('express');
const router = express.Router();
const {
    createEducation,
    getEducations,
    getSingleEducation,
    updateEducation,
    deleteEducation
} = require('../controllers/educationController');

const { validateCandidate } = require('../middleware/validateTokenHandler');

router.route('/')
    .post(validateCandidate , createEducation)         
    .get(validateCandidate,getEducations);            

router.route('/:educationId')
    .get(validateCandidate,getSingleEducation)              
    .put(validateCandidate,updateEducation)           
    .delete(validateCandidate,deleteEducation);       

module.exports = router;
