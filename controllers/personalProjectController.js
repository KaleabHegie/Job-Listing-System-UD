const asyncHandler = require('express-async-handler');
const PersonalProject = require('../models/personalProjectModel');
const Candidate = require('../models/candidateModel');

// @desc    Create a personal project for a candidate
// @route   POST /api/candidates/:candidateId/personalProjects
// @access  Private (Admin only)
const createPersonalProject = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const { name, description, link } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error('Please provide name and description');
    }

    const personalProject = new PersonalProject({
        candidate_id: candidate._id,
        name,
        description,
        link
    });

    const savedProject = await personalProject.save();

    res.status(201).json({
        message: 'Personal project added successfully',
        personalProject: savedProject
    });
});

// @desc    Get all personal projects for a candidate
// @route   GET /api/candidates/:candidateId/personalProjects
// @access  Private (Admin only)
const getPersonalProjects = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const projects = await PersonalProject.find({ candidate_id: candidate._id });

    res.status(200).json({
        message: 'Candidate personal projects retrieved',
        personalProjects: projects
    });
});

// @desc    Get a single personal project
// @route   GET /api/candidates/:candidateId/personalProjects/:projectId
// @access  Private (Admin only)
const getPersonalProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const project = await PersonalProject.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error('Personal project not found');
    }

    res.status(200).json({
        message: 'Personal project retrieved',
        personalProject: project
    });
});

// @desc    Update a personal project
// @route   PUT /api/candidates/:candidateId/personalProjects/:projectId
// @access  Private (Admin only)
const updatePersonalProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const project = await PersonalProject.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error('Personal project not found');
    }

    const { name, description, link } = req.body;

    project.name = name || project.name;
    project.description = description || project.description;
    project.link = link || project.link;

    const updatedProject = await project.save();

    res.status(200).json({
        message: 'Personal project updated successfully',
        personalProject: updatedProject
    });
});

// @desc    Delete a personal project
// @route   DELETE /api/candidates/:candidateId/personalProjects/:projectId
// @access  Private (Admin only)
const deletePersonalProject = asyncHandler(async (req, res) => {
    const { projectId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const project = await PersonalProject.findById(projectId);
    if (!project) {
        res.status(404);
        throw new Error('Personal project not found');
    }

    await Project.findByIdAndDelete(projectId);

    res.status(200).json({
        message: 'Personal project removed successfully'
    });
});

module.exports = {
    createPersonalProject,
    getPersonalProjects,
    getPersonalProject,
    updatePersonalProject,
    deletePersonalProject
};
