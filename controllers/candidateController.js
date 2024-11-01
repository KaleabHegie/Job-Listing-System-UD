const Candidate = require('../models/candidateModel');

// Controller to manage user profile
const userController = {
    // Get profile
    getProfile: async (req, res) => {
        try {
            const userId = req.user._id;  // Assuming user ID is available in req.user from authentication middleware
            const profile = await Candidate.findOne({ user_id: userId }).populate('skill');
            
            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.status(200).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving profile', error });
        }
    },

    // Edit profile
    editProfile: async (req, res) => {
        try {
            const userId = req.user.id; 
            const updatedData = req.body;
            const updatedProfile = await Candidate.findOneAndUpdate(
                { user_id: userId },
                updatedData,
                { new: true, runValidators: true }
            );

            

            if (!updatedProfile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.status(200).json(updatedProfile);
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error });
        }
    }
};

module.exports = userController;
