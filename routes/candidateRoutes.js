const express = require('express');
const router = express.Router();
const {createPersonalProject,getPersonalProjects,getPersonalProject,updatePersonalProject,deletePersonalProject} = require('../controllers/candidateController');
const { validateAdmin , validateCandidate , validateRecruiter } = require('../middleware/validateTokenHandler');

router.route('/:id/personalProjects')
    .post(createPersonalProject)  
    .get(getPersonalProjects);    

router.route('/:id/personalProjects/:projectId')
    .get(getPersonalProject)      
    .put(updatePersonalProject)   
    .delete(deletePersonalProject); 


module.exports = router;
