const asyncHandler = require('express-async-handler')
const Jobs = require('../models/jobModel');
const Users = require('../models/userModel');
const Recruiter = require('../models/recruiterModel');

//@desc Get all jobs
//@route GET /api/jobs
//@access Public
const getAllJobs = asyncHandler(async (req, res) => {
    const jobs = await Jobs.find();
    res.status(200).json({
        message: 'Get all jobs',
        data: jobs 
    });
});



//@desc Create a job
//@route POST /api/jobs
//@access Public
const createJob = asyncHandler(async (req, res) => {
    const userId = req.user.id; 
    

    const {
        company,
        title,
        description,
        vacancy,
        experience,
        skills,
        sector,
        position
    } = req.body;

    if (!company || !title || !description || !vacancy || !experience || !skills || !sector || !position) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Fetch the user by their ID
    const user = await Users.findById(userId);
    console.log('Fetched User:', user); // Debug: log the fetched user

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Assuming recruiters is an array of company IDs in the user model
    const recruiter = await Recruiter.findOne({ user_id: userId });
    

    const isCompanyValid = recruiter.company_id == company;
    if (!isCompanyValid) {
        res.status(403);
        throw new Error('You are not authorized to post a job for this company');
    }

    const newJob = await Jobs.create({
        company,
        title,
        description,
        vacancy,
        experience,
        skills,
        sector,
        position,
        createdBy: recruiter._id // Assuming you want the recruiter ID here
    });

    res.status(201).json({
        id: newJob._id,
        company: newJob.company,
        title: newJob.title,
        description: newJob.description,
        vacancy: newJob.vacancy,
        experience: newJob.experience,
        skills: newJob.skills,
        sector: newJob.sector,
        position: newJob.position,
        status: newJob.status,
        createdBy: newJob.createdBy
    });
});





//@desc Get a single job
//@route GET /api/jobs/:id
//@access Public
const getSingleJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id; 
    const job = await Jobs.findById(jobId); // Fetch the job by its ID
   

    if (!job) {
        return res.status(404).json({ message: 'Job not found' }); // If no job is found, return a 404
    }

    res.status(200).json({
        id: job._id,
        company: job.company,
        title: job.title,
        description: job.description,
        vacancy: job.vacancy,
        experience: job.experience,
        skills: job.skills,
        sector: job.sector,
        position: job.position,
        status: job.status,
        createdBy: job.createdBy
    });
});



//@desc Update a job
//@route PUT /api/jobs/:id
//@access Public
const updateJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id; 
    const userId = req.user.id
    const recruiter = await Recruiter.findOne({ user_id: userId });
    

   

    const {
        company,
        title,
        description,
        vacancy,
        experience,
        skills,
        sector,
        position
    } = req.body;

    const isCompanyValid = recruiter.company_id == company;
    if (!isCompanyValid) {
        res.status(403);
        throw new Error('You are not authorized to post a job for this company');
    }

    // Check if job exists
    const job = await Jobs.findById(jobId);
    if (!job) {
        return res.status(404).json({ message: 'Job not found' }); // If no job is found, return a 404
    }

    // Update the job with new data
    job.company = company || job.company;
    job.title = title || job.title;
    job.description = description || job.description;
    job.vacancy = vacancy || job.vacancy;
    job.experience = experience || job.experience;
    job.skills = skills || job.skills;
    job.sector = sector || job.sector;
    job.position = position || job.position;

    await job.save(); // Save the updated job

    res.status(200).json({
        message: 'Job updated successfully',
        id: job._id,
        company: job.company,
        title: job.title,
        description: job.description,
        vacancy: job.vacancy,
        experience: job.experience,
        skills: job.skills,
        sector: job.sector,
        position: job.position,
        status: job.status,
        createdBy: job.createdBy
    });
});

//@desc Delete a job
//@route DELETE /api/jobs/:id
//@access Public
const deleteJob = asyncHandler(async (req, res) => {
    const jobId = req.params.id; 
    const userId = req.user.id
    const job = await Jobs.findById(jobId);
    const recruiter = await Recruiter.findOne({ user_id: userId });
    

    const isCompanyValid = recruiter.id == job.createdBy.toString()
    if (!isCompanyValid) {
        res.status(403);
        throw new Error('You are not authorized to delete this job!');
    }

    if (!job) {
        return res.status(404).json({ message: 'Job not found' }); // If no job is found, return a 404
    }

    await Jobs.findByIdAndDelete(jobId)
    res.status(200).json({ message: 'Job deleted successfully' });
});







//@desc Get all jobs with optional keyword filtering
//@route GET /api/jobs
//@access Public
const searchJobs = asyncHandler(async (req, res) => {
    const { keyword } = req.query; // Get the keyword from query parameters

    const filters = {}; // Initialize filters object

    // If a keyword is provided, add filters for title, location, and company
    if (keyword) {
        filters.$or = [
            { title: { $regex: keyword, $options: 'i' } },    // Case-insensitive search for title
            { location: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for location
            { company: { $regex: keyword, $options: 'i' } }   // Case-insensitive search for company
        ];
    }

    const jobs = await Jobs.find(filters); // Find jobs based on filters

    res.status(200).json({
        message: 'Filtered jobs retrieved successfully',
        data: jobs,
    });
});




module.exports = {  
    getAllJobs,
    createJob,
    updateJob,
    deleteJob,
    getSingleJob,
    searchJobs
}

