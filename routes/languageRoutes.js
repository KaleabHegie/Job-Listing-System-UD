const express = require('express');
const router = express.Router();
const {
    createLanguage,
    getLanguages,
    getSingleLanguage,
    updateLanguage,
    deleteLanguage
} = require('../controllers/languageController');
const { validateCandidate } = require('../middleware/validateTokenHandler');

router.route('/')
    .post(validateCandidate , createLanguage)          
    .get(validateCandidate , getLanguages);             

router.route('/:languageId')
    .get(validateCandidate , getSingleLanguage)              
    .put(validateCandidate , updateLanguage)           
    .delete(validateCandidate, deleteLanguage);       

module.exports = router;
