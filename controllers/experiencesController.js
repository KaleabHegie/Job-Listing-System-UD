const asyncHandler = require('express-async-handler');
const Experience = require('../models/experienceModel');
const Candidate = require('../models/candidateModel');

// @desc Create an experience for a candidate
// @route POST /api/candidates/:candidateId/experiences
// @access Private (Admin only)
const createExperience = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const { company_name, position, from, to, description } = req.body;

    if (!company_name || !position || !from || !to || !description) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const experience = new Experience({
        candidate_id: candidate._id,
        company_name,
        position,
        from,
        to,
        description
    });

    const savedExperience = await experience.save();
    res.status(201).json({
        message: 'Experience created successfully',
        experience: savedExperience
    });
});

// @desc Get all experiences of a candidate
// @route GET /api/candidates/:candidateId/experiences
// @access Private (Admin only)
const getExperiences = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const experiences = await Experience.find({ candidate_id: candidate._id });
    res.status(200).json({
        message: 'Candidate experiences retrieved',
        experiences
    });
});

// @desc Get a single experience of a candidate
// @route GET /api/candidates/:candidateId/experiences/:experienceId
// @access Private (Admin only)
const getSingleExperience = asyncHandler(async (req, res) => {
    const { experienceId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) {
        res.status(404);
        throw new Error('Experience not found');
    }

    res.status(200).json({
        message: 'Candidate experience retrieved',
        experience
    });
});

// @desc Update an experience for a candidate
// @route PUT /api/candidates/:candidateId/experiences/:experienceId
// @access Private (Admin only)
const updateExperience = asyncHandler(async (req, res) => {
    const { experienceId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) {
        res.status(404);
        throw new Error('Experience not found');
    }

    const { company_name, position, from, to, description } = req.body;

    if (company_name) experience.company_name = company_name;
    if (position) experience.position = position;
    if (from) experience.from = from;
    if (to) experience.to = to;
    if (description) experience.description = description;

    const updatedExperience = await experience.save();

    res.status(200).json({
        message: 'Experience updated successfully',
        experience: updatedExperience
    });
});

// @desc Delete an experience of a candidate
// @route DELETE /api/candidates/:candidateId/experiences/:experienceId
// @access Private (Admin only)
const deleteExperience = asyncHandler(async (req, res) => {
    const { experienceId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const experience = await Experience.findById(experienceId);
    if (!experience) {
        res.status(404);
        throw new Error('Experience not found');
    }

    await Experience.findByIdAndDelete(experienceId);

    res.status(200).json({
        message: 'Experience removed from candidate'
    });
});

module.exports = {
    createExperience,
    getExperiences,
    getSingleExperience,
    updateExperience,
    deleteExperience
};
