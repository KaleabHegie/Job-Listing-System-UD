const asyncHandler = require('express-async-handler');
const Education = require('../models/educationModel');
const Candidate = require('../models/candidateModel');

// @desc Create an education for a candidate
// @route POST /api/candidates/:candidateId/educations
// @access Private (Admin only)
const createEducation = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const { institution_name, degree, field_of_study, from, to, grade, description } = req.body;

    if (!institution_name || !degree || !field_of_study || !from || !to || !grade || !description) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const education = new Education({
        candidate_id: candidate._id,
        institution_name,
        degree,
        field_of_study,
        from,
        to,
        grade,
        description
    });

    const savedEducation = await education.save();
    res.status(201).json({
        message: 'Education created successfully',
        education: savedEducation
    });
});

// @desc Get all educations of a candidate
// @route GET /api/candidates/:candidateId/educations
// @access Private (Admin only)
const getEducations = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const educations = await Education.find({ candidate_id: candidate._id });
    res.status(200).json({
        message: 'Candidate educations retrieved',
        educations
    });
});

// @desc Get a single education of a candidate
// @route GET /api/candidates/:candidateId/educations/:educationId
// @access Private (Admin only)
const getSingleEducation = asyncHandler(async (req, res) => {
    const { educationId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const education = await Education.findById(educationId);
    if (!education) {
        res.status(404);
        throw new Error('Education not found');
    }

    res.status(200).json({
        message: 'Candidate education retrieved',
        education
    });
});

// @desc Update an education for a candidate
// @route PUT /api/candidates/:candidateId/educations/:educationId
// @access Private (Admin only)
const updateEducation = asyncHandler(async (req, res) => {
    const { educationId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const education = await Education.findById(educationId);
    if (!education) {
        res.status(404);
        throw new Error('Education not found');
    }

    const { institution_name, degree, field_of_study, from, to, grade, description } = req.body;

    if (institution_name) education.institution_name = institution_name;
    if (degree) education.degree = degree;
    if (field_of_study) education.field_of_study = field_of_study;
    if (from) education.from = from;
    if (to) education.to = to;
    if (grade) education.grade = grade;
    if (description) education.description = description;

    const updatedEducation = await education.save();

    res.status(200).json({
        message: 'Education updated successfully',
        education: updatedEducation
    });
});

// @desc Delete an education of a candidate
// @route DELETE /api/candidates/:candidateId/educations/:educationId
// @access Private (Admin only)
const deleteEducation = asyncHandler(async (req, res) => {
    const { educationId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const education = await Education.findById(educationId);
    if (!education) {
        res.status(404);
        throw new Error('Education not found');
    }

    await Education.findByIdAndRemove(educationId);

    res.status(200).json({
        message: 'Education removed from candidate'
    });
});

module.exports = {
    createEducation,
    getEducations,
    getSingleEducation,
    updateEducation,
    deleteEducation
};
