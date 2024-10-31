const asyncHandler = require('express-async-handler');
const Language = require('../models/languageModel');
const Candidate = require('../models/candidateModel');

// @desc Create a language for a candidate
// @route POST /api/candidates/:candidateId/languages
// @access Private (Admin only)
const createLanguage = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const { name, level } = req.body;
    if (!name || !level) {
        res.status(400);
        throw new Error('Please provide both name and level');
    }

    const language = new Language({
        candidate_id: candidate._id,
        name,
        level
    });

    const savedLanguage = await language.save();
    res.status(201).json({
        message: 'Language added to candidate',
        language: savedLanguage
    });
});

// @desc Get all languages of a candidate
// @route GET /api/candidates/:candidateId/languages
// @access Private (Admin only)
const getLanguages = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const languages = await Language.find({ candidate_id: candidate._id });
    res.status(200).json({
        message: 'Candidate languages retrieved',
        languages
    });
});

// @desc Get a single language of a candidate
// @route GET /api/candidates/:candidateId/languages/:languageId
// @access Private (Admin only)
const getSingleLanguage = asyncHandler(async (req, res) => {
    const { languageId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const language = await Language.findById(languageId);
    if (!language) {
        res.status(404);
        throw new Error('Language not found');
    }

    res.status(200).json({
        message: 'Candidate language retrieved',
        language
    });
});

// @desc Update a language for a candidate
// @route PUT /api/candidates/:candidateId/languages/:languageId
// @access Private (Admin only)
const updateLanguage = asyncHandler(async (req, res) => {
    const { languageId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const language = await Language.findById(languageId);
    if (!language) {
        res.status(404);
        throw new Error('Language not found');
    }

    const { name, level } = req.body;

    if (name) language.name = name;
    if (level) language.level = level;

    const updatedLanguage = await language.save();

    res.status(200).json({
        message: 'Language updated successfully',
        language: updatedLanguage
    });
});

// @desc Delete a language of a candidate
// @route DELETE /api/candidates/:candidateId/languages/:languageId
// @access Private (Admin only)
const deleteLanguage = asyncHandler(async (req, res) => {
    const { languageId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const language = await Language.findById(languageId);
    if (!language) {
        res.status(404);
        throw new Error('Language not found');
    }

    await Language.findByIdAndDelete(languageId);

    res.status(200).json({
        message: 'Language removed from candidate'
    });
});

module.exports = {
    createLanguage,
    getLanguages,
    getSingleLanguage,
    updateLanguage,
    deleteLanguage
};
