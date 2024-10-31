const asyncHandler = require('express-async-handler');
const Skills = require('../models/skillModel');
const { find, findById } = require('../models/jobModel');

// Admin only
//@desc Create a new skill
//@route POST /api/skills/create_skill
//@access Admin
const createSkill = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        res.status(400);
        throw new Error('Please provide both title and description for the skill');
    }
    const newSkill = new Skills({
        title,
        description
    });
    const savedSkill = await newSkill.save();
    res.status(201).json({
        id: savedSkill._id,
        title: savedSkill.title,
        description: savedSkill.description,
    });
});

//@desc Get all skills
//@route GET /api/skills/all_skills
//@access Admin
const getAllSkills = asyncHandler(async (req, res) => {
    const skills = await Skills.find();
    res.status(200).json({
        message: 'Get all skills',
        data: skills 
    });
});

//@desc Get a single skill
//@route GET /api/skills/:id
//@access Admin
const getSkillById = asyncHandler(async (req, res) => {
    const skill = await Skills.findById(req.params.id);
    
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    res.status(200).json({
        message: 'Skill retrieved successfully',
        data: skill
    });
});

//@desc Update a skill
//@route PUT /api/skills/:id
//@access Admin
const updateSkill = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    // Check if the skill exists
    const skill = await Skills.findById(req.params.id);
    
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    // Update the skill fields
    skill.title = title || skill.title; // Only update if provided
    skill.description = description || skill.description; // Only update if provided

    const updatedSkill = await skill.save();

    res.status(200).json({
        message: 'Skill updated successfully',
        data: updatedSkill
    });
});

//@desc Delete a skill
//@route DELETE /api/skills/:id
//@access Admin
const deleteSkill = asyncHandler(async (req, res) => {
    const skill = await Skills.findById(req.params.id);
    
    if (!skill) {
        res.status(404);
        throw new Error('Skill not found');
    }

    await Skills.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: 'Skill deleted successfully'
    });
});

module.exports = {  
    createSkill,
    getAllSkills,
    getSkillById,
    updateSkill,
    deleteSkill
};
