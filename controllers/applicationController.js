const Application = require('../models/applicationModel'); // Adjust the path as necessary
const Users = require('../models/userModel');
const Candidate = require('../models/candidateModel');
const asyncHandler = require('express-async-handler');

const applicationController = {
    // Create a new application
    createApplication: asyncHandler(async (req, res) => {
        const { job_id } = req.params;
        const { coverLetter } = req.body;

        
        let candidate = await Candidate.findOne({ user_id: req.user.id });
        let candidate_id = candidate._id

        console.log(candidate_id , job_id)

        if (!candidate_id || !job_id) {
            return res.status(400).json({ message: 'Candidate ID and Job ID are required' });
        }

        const newApplication = await Application.create({
            candidate_id,
            job_id,
            coverLetter
        });

        res.status(201).json({ message: 'Application created successfully', application: newApplication });
    }),

    // Get all applications
    getAllApplications: asyncHandler(async (req, res) => {
        const applications = await Application.find().populate('candidate_id').populate('job_id');
        res.status(200).json(applications);
    }),

    // Get a specific application by ID
    getApplicationById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const application = await Application.findById(id).populate('candidate_id').populate('job_id');

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
        );

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
    })
};

module.exports = applicationController;
