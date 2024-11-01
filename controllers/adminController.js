const Candidate = require('../models/candidateModel');
const Users = require('../models/userModel');
const bcrypt = require('bcrypt');

// Controller for admin actions on users
const adminController = {




    registerRecruiter : async (req, res) => {
        try {
            const { first_name, last_name, user_name, date_of_birth, email, phone, address, city, country, password, photo } = req.body;
  

            // Check if email is already registered 
            const existingUser = await Users.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                first_name,
                last_name,
                user_name,
                date_of_birth,
                email,
                phone,
                address,
                city,
                country,
                password: hashedPassword,
                photo,
                role : 'recruiter'
            });
            res.status(201).json({ message: 'User registered successfully' , user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }

    },
    // Get all users
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    },


    getAllCandidates: async (req, res) => {
        try {
            const users = await Candidate.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving candidates', error });
        }
    },
    

    // Get specific user information
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await Users.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    },


    getCandidateById: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await Candidate.findById(userId);
            
            if (!user) {
                return res.status(404).json({ message: 'Candidate not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving candidate', error });
        }
    },

    // Deactivate a user
    deactivateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await Candidate.findByIdAndUpdate(
                userId,
                { active: false },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User deactivated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error deactivating user', error });
        }
    },

    // Activate a user
    activateUser: async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await Candidate.findByIdAndUpdate(
                userId,
                { active: true },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User activated successfully', user });
        } catch (error) {
            res.status(500).json({ message: 'Error activating user', error });
        }
    }
};

module.exports = adminController;
