const express = require('express');
const router = express.Router();
const {
    createPersonalProject,
    getPersonalProjects,
    getPersonalProject,
    updatePersonalProject,
    deletePersonalProject
} = require('../controllers/personalProjectController');
const { validateCandidate } = require('../middleware/validateTokenHandler');

router.route('/')
    .post(validateCandidate , createPersonalProject)    
    .get(validateCandidate , getPersonalProjects);      

router.route('/:projectId')
    .get(validateCandidate , getPersonalProject)        
    .put(validateCandidate , updatePersonalProject)     
    .delete(validateCandidate, deletePersonalProject); 

module.exports = router;
