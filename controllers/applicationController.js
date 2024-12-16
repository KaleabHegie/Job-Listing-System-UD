const Application = require('../models/applicationModel');
const Candidate = require('../models/candidateModel');
const Bookmark = require('../models/bookmarkModel');
const asyncHandler = require('express-async-handler');

const applicationController = {
    // Create a new application
    createApplication: asyncHandler(async (req, res) => {
        const { job_id } = req.params;
        const userId = req.user._id || req.user.id; // req.user should be set by the middleware

        // Validate candidate and job existence

        const candidate = await Candidate.findOne({ user: userId });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found for the given user' });
        }

        if (!job_id) {
            return res.status(400).json({ message: 'Job ID is required' });
        }

        const newApplication = await Application.create({
            candidate_id: candidate._id,
            job_id,
        });

        res.status(201).json({ message: 'Application created successfully', application: newApplication });
    }),

    // Create a bookmark
    createBookmark: asyncHandler(async (req, res) => {
        const { job_id } = req.params;
        const userId = req.user._id || req.user.id;

        // Validate candidate and job existence
        const candidate = await Candidate.findOne({ user: userId });
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found for the given user' });
        }

        if (!job_id) {
            return res.status(400).json({ message: 'Job ID is required' });
        }

        const newBookmark = await Bookmark.create({
            candidate_id: candidate._id,
            job_id,
        });

        res.status(201).json({ message: 'Bookmark created successfully', bookmark: newBookmark });
    }),

    // Get all applications
    getAllApplications: asyncHandler(async (req, res) => {
        const applications = await Application.find().populate([
            { path: 'candidate_id', populate: { path: 'user' } },
            { path: 'job_id' },
        ]);

        res.status(200).json(applications);
    }),

    // Get a specific application by ID
    getApplicationById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const application = await Application.findById(id).populate([
            { path: 'candidate_id', populate: { path: 'user' } },
            { path: 'job_id' },
        ]);

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(application);
    }),

    // Update application status
    updateApplicationStatus: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { status, coverLetter } = req.body;

        const updatedApplication = await Application.findByIdAndUpdate(
            id,
            { status, coverLetter },
            { new: true }
        ).populate([
            { path: 'candidate_id', populate: { path: 'user' } },
            { path: 'job_id' },
        ]);

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application updated successfully', application: updatedApplication });
    }),

    // Delete an application
    deleteApplication: asyncHandler(async (req, res) => {
        const { id } = req.params;

        const deletedApplication = await Application.findByIdAndDelete(id);

        if (!deletedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json({ message: 'Application deleted successfully' });
    }),

    // Update stats
    updateStat: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedApplication = await Application.findByIdAndUpdate(id, updatedData, {
            new: true,
        }).populate([
            { path: 'candidate_id', populate: { path: 'user' } },
            { path: 'job_id' },
        ]);

        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }

        res.status(200).json(updatedApplication);
    }),
};

module.exports = applicationController;
