const Application = require('../models/applicationModel'); // Adjust the path as necessary
const Users = require('../models/userModel');
const Candidate = require('../models/candidateModel');
const asyncHandler = require('express-async-handler');
const Bookmark = require('../models/bookmarkModel');

const applicationController = {
    // Create a new application
    createApplication: asyncHandler(async (req, res) => {
       
        const { job_id } = req.params;
        let userId
            if (req.user._id !== undefined ){
                userId = req.user._id 
            }
            else{
                userId =  req.user.id
            } 

        
        let candidate = await Candidate.findOne({ user : userId });
        let candidate_id = candidate._id

        if (!candidate_id || !job_id) {
            return res.status(400).json({ message: 'Candidate ID and Job ID are required' });
        }

        const newApplication = await Application.create({
            candidate_id,
            job_id,
        });

        res.status(201).json({ message: 'Application created successfully', application: newApplication });
    }),

    createBookmark: asyncHandler(async (req, res) => {
       
        const { job_id } = req.params;
        let userId
            if (req.user._id !== undefined ){
                userId = req.user._id 
            }
            else{
                userId =  req.user.id
            } 

        
        let candidate = await Candidate.findOne({ user : userId });
        let candidate_id = candidate._id

        if (!candidate_id || !job_id) {
            return res.status(400).json({ message: 'Candidate ID and Job ID are required' });
        }

        const newApplication = await Bookmark.create({
            candidate_id,
            job_id,
        });

        res.status(201).json({ message: 'Application created successfully', application: newApplication });
    }),

    // Get all applications
    getAllApplications: asyncHandler(async (req, res) => {
        const applications = await Application.find().populate({
            path: 'candidate_id',
            populate: { path: 'user' }, // Populate the `user` field in the `Candidate` schema
          }).populate('job_id');
        res.status(200).json(applications);
    }),

    // Get a specific application by ID
    getApplicationById: asyncHandler(async (req, res) => {
        const { id } = req.params;
        const application = await Application.findById(id).populate({
            path: 'candidate_id',
            populate: { path: 'user' }, // Populate the `user` field in the `Candidate` schema
          }).populate('job_id');

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
    }),

    updateStat : asyncHandler (async (req , res) => {
        try {
            const { id } = req.params;
            const updatedData = req.body;
        
            const updatedApplication = await Application.findByIdAndUpdate(id, updatedData, {
              new: true, // Return the updated document
            }).populate('candidate_id.user job_id'); // Repopulate data if needed
        
            res.status(200).json(updatedApplication);
          } catch (error) {
            res.status(500).json({ message: 'Error updating application', error });
          }
    })
};

module.exports = applicationController;
