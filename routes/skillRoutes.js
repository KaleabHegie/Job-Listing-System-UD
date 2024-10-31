const express = require('express');
const router = express.Router();
const { createSkill, getAllSkills, getSkillById, updateSkill, deleteSkill } = require('../controllers/skillController');
const { validateAdmin } = require('../middleware/validateTokenHandler');

// Define routes
router.route('/create_skill').post(validateAdmin, createSkill); 
router.route('/all_skills').get(validateAdmin, getAllSkills); 
router.route('/single_skill/:id').get(validateAdmin, getSkillById); 
router.route('/update/:id').put(validateAdmin, updateSkill); 
router.route('/delete/:id').delete(validateAdmin, deleteSkill); 

module.exports = router;