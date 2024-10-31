const asyncHandler = require('express-async-handler');
const Skills = require('../models/skillModel');  
const Candidate = require('../models/candidateModel')


// @desc Create a skill for a candidate
// @route POST /api/candidates/:candidateId/skills
// @access Private (Admin only)
const createCandidateSkill = asyncHandler(async (req, res) => {

    const userId = req.user.id; 

    const candidate = await Candidate.findOne({ user_id: userId });
    const { candidateId } = candidate._id;
    const { skill } = req.body; // Expecting an array of skill IDs

    if (!candidateId || !skill) {
        res.status(400);
        throw new Error('Please provide candidate ID and skill');
    }

   
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    // Add skills to the candidate's skill array
    candidate.skill.push(...skill);
    await candidate.save();

    res.status(201).json({
        message: 'Skill(s) added to candidate',
        skills: candidate.skill,
    });
});

// @desc Get all skills of a candidate
// @route GET /api/candidates/:candidateId/skills
// @access Private (Admin only)
const getCandidateSkills = asyncHandler(async (req, res) => {
    const userId = req.user.id; 

    const candidate = await Candidate.findOne({ user_id: userId }).populate('skill');
    const { candidateId } = candidate._id;

    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }
    console.log(candidate)
    res.status(200).json({
        message: 'Candidate skills retrieved',
        skills: candidate.skill,
    });
});

// @desc Get a single skill of a candidate
// @route GET /api/candidates/:candidateId/skills/:skillId
// @access Private (Admin only)
const getSingleCandidateSkill = asyncHandler(async (req, res) => {
    const {  skillId } = req.params;

    const userId = req.user.id; 

    const candidate = await Candidate.findOne({ user_id: userId }).populate('skill');
    const { candidateId } = candidate._id;
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const skill = candidate.skill.id(skillId);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    res.status(200).json({
        message: 'Candidate skill retrieved',
        skill,
    });
});

// @desc Update a skill for a candidate
// @route PUT /api/candidates/:candidateId/skills/:skillId
// @access Private (Admin only)
const updateCandidateSkill = asyncHandler(async (req, res) => {
    const {  skillId } = req.params;
    const { title, description } = req.body;

    const userId = req.user.id; 

    const candidate = await Candidate.findOne({ user_id: userId }).populate('skill');
    const { candidateId } = candidate._id;
    
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const skill = candidate.skill.id(skillId);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Update the skill properties
    if (title) skill.title = title;
    if (description) skill.description = description;
    
    await candidate.save();

    res.status(200).json({
        message: 'Skill updated successfully',
        skill,
    });
});

// @desc Delete a skill from a candidate
// @route DELETE /api/candidates/:candidateId/skills/:skillId
// @access Private (Admin only)
const deleteCandidateSkill = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const { skillId } = req.params; 

    const candidate = await Candidate.findOne({ user_id: userId });
    const { candidateId } = candidate._id;
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const skill = candidate.skill.id(skillId);
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    skill.remove();
    await candidate.save();

    res.status(200).json({
        message: 'Skill removed from candidate',
    });
});

module.exports = {
    createCandidateSkill,
    getCandidateSkills,
    getSingleCandidateSkill,
    updateCandidateSkill,
    deleteCandidateSkill,
};
