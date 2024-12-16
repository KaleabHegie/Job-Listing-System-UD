const asyncHandler = require('express-async-handler');
const Job = require('../models/jobModel'); // Adjust the path according to your project structure

// Create a new job
const createJob = asyncHandler(async (req, res) => {
    const { company, title, description, vacancy , skills, sector , salary , requirements , location} = req.body;
    console.log(req.user)

    const job = new Job({
        company,
        title,
        description,
        vacancy,
        salary,
        skills,
        sector,
        requirements,
        location,
        createdBy: '6752cdc05453fe7f7730dc56'
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
});

// Get all jobs
const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find()
    .populate('sector', 'name')
    .populate('createdBy', 'user_name')
    .populate('company', 'name'); 
    res.status(200).json({ message : 'All jobs' , data : jobs});
});

// Get a specific job by ID
const getJobById = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id).populate('createdBy', 'user_name');

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    res.status(200).json(job);
});

// Update a job by ID
const updateJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    // Check if the user is authorized to update this job
    // if (job.createdBy.toString() !== req.user.id) {
    //     res.status(403);
    //     throw new Error('Not authorized to update this job');
    // }

    // Update job details
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJob);
});

// Delete a job by ID
const deleteJob = asyncHandler(async (req, res) => {
    const job = await Job.findById(req.params.id);

    if (!job) {
        res.status(404);
        throw new Error('Job not found');
    }

    // Check if the user is authorized to delete this job
    // if (job.createdBy.toString() !== req.user.id) {
    //     res.status(403);
    //     throw new Error('Not authorized to delete this job');
    // }

    await job.deleteOne();
    res.status(204).json({ message: 'Job removed' });
});

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
};
