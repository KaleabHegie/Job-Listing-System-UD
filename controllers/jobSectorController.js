const asyncHandler = require('express-async-handler');
const JobSector = require('../models/jobSectorModel');

// Create a new job
const createJobSector = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const jobSector = new JobSector({
        
        title,
        description,
    });

    const savedJobSector = await jobSector.save();
    res.status(201).json(savedJobSector);
});

// Get all jobs
const getAllJobSectors = asyncHandler(async (req, res) => {
    const jobSector = await JobSector.find(); // Populating createdBy to get user name
    res.status(200).json({ message : 'All job sectors' , data : jobSector});
});

// Get a specific job by ID
const getJobSectorById = asyncHandler(async (req, res) => {
    const jobSector = await JobSector.findById(req.params.id)

    if (!jobSector) {
        res.status(404);
        throw new Error('Job Sector not found');
    }

    res.status(200).json(job);
});

// Update a job by ID
const updateJobSector = asyncHandler(async (req, res) => {
    const jobSector = await JobSector.findById(req.params.id);

    if (!jobSector) {
        res.status(404);
        throw new Error('Job Sector not found');
    }

 


    // Update job details
    const updatedJobSector = await JobSector.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedJobSector);
});

// Delete a job by ID
const deleteJobSector = asyncHandler(async (req, res) => {
    const jobSector = await JobSector.findById(req.params.id);

    if (!jobSector) {
        res.status(404);
        throw new Error('Job Sector not found');
    }



    await jobSector.deleteOne();
    res.status(204).json({ message: 'Job Sector removed' });
});

module.exports = {
    createJobSector,
    getAllJobSectors,
    getJobSectorById,
    updateJobSector,
    deleteJobSector,
};
