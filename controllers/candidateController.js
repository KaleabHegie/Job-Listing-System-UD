const Candidate = require('../models/candidateModel');
const Application = require('../models/applicationModel');
const Bookmark = require('../models/bookmarkModel');

// Controller to manage user profile
const userController = {
    // Get profile
    getProfile: async (req, res) => {
        try {
            let userId
            if (req.user._id !== undefined ){
                userId = req.user._id 
            }
            else{
                userId =  req.user.id
            } 
            const profile = await Candidate.findOne({ user: userId }).populate('user');
            console.log(userId)
            
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
            
            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving profile', error });
        }
    },
    appliedJobs: async (req, res) => {
        try {
            let userId
            if (req.user._id !== undefined ){
                userId = req.user._id 
            }
            else{
                userId =  req.user.id
            } 
            
            // Step 1: Find the candidate profile based on the logged-in user
            const profile = await Candidate.findOne({ user: userId }).populate('user')
            if (!profile) {
                return res.status(404).json({ message: 'Candidate profile not found' });
            }
            
            // Step 2: Find applications for the candidate
            const applications = await Application.find({ candidate_id: profile._id })
                .populate('candidate_id')  // Populate candidate details
                .populate('job_id');       // Populate job details
    
            // Step 3: Return the applications with job and candidate details
            res.status(200).json(applications);
        } catch (error) {
            console.error('Error retrieving applications:', error);
            res.status(500).json({ message: 'Error retrieving applications', error: error.message });
        }
    },

    bookmarkedJobs: async (req, res) => {
        try {
            let userId
            if (req.user._id !== undefined ){
                userId = req.user._id 
            }
            else{
                userId =  req.user.id
            } 
            
            // Step 1: Find the candidate profile based on the logged-in user
            const profile = await Candidate.findOne({ user: userId }).populate('user');
            if (!profile) {
                return res.status(404).json({ message: 'Candidate profile not found' });
            }
            
            // Step 2: Find applications for the candidate
            const applications = await Bookmark.find({ candidate_id: profile._id })
                .populate('candidate_id')  // Populate candidate details
                .populate('job_id');       // Populate job details
    
            // Step 3: Return the applications with job and candidate details
            res.status(200).json(applications);
        } catch (error) {
            console.error('Error retrieving applications:', error);
            res.status(500).json({ message: 'Error retrieving applications', error: error.message });
        }
    },
    
    // Edit profile
    editProfile: async (req, res) => {
        try {
            let userId
            if (req.user._id !== undefined ){
                userId = req.user._id 
            }
            else{
                userId =  req.user.id
            } 
            const updatedData = req.body;
    
            const updatedProfile = await Candidate.findOneAndUpdate(
                { user: userId }, // Ensure user field matches the userId
                updatedData,
                { new: true, runValidators: true }
            );
    
            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }
    
            res.status(200).json(updatedProfile);
        } catch (error) {
            console.error(error); // Log the error for debugging
            res.status(500).json({ message: 'Error updating profile', error });
        }
    }
    
};

module.exports = userController;
