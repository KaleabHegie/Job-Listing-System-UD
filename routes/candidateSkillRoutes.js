const express = require('express');
const router = express.Router();
const {
    createCandidateSkill,
    getCandidateSkills,
    getSingleCandidateSkill,
    updateCandidateSkill,
    deleteCandidateSkill,
} = require('../controllers/candidateSkillController');
const { validateAdmin, validateCandidate } = require('../middleware/validateTokenHandler'); // Admin validation middleware


router.post('/', validateCandidate, createCandidateSkill);
router.get('/', validateCandidate, getCandidateSkills);
router.get('/:skillId', validateCandidate, getSingleCandidateSkill);
router.put('/:skillId', validateCandidate, updateCandidateSkill);
router.delete('/:skillId', validateCandidate, deleteCandidateSkill);

module.exports = router;
