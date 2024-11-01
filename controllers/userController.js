const Users = require('../models/userModel');
const Candidate = require('../models/candidateModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')

const userController = {
    // Register a new user
    register: async (req, res) => {
        try {
            const { first_name, last_name, user_name, date_of_birth, email, phone, address, city, country, password, photo, role } = req.body;

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
                photo
            });

            const newCandidate = await Candidate.create({
                user_id: newUser._id, // Associate candidate with the user
                skill: [], // You can add skills if needed
                languages: [], // You can add languages if needed
                certificates: [], // You can add certificates if needed
                experiences: [], // You can add experiences if needed
                educations: [], // You can add educations if needed
                personalProjects: [], // You can add personal projects if needed
                active: true // Default to active
            });

            res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            res.status(500).json({ message: 'Error registering user', error });
        }
    },

    // Login a user
    // login: async (req, res) => {
    //     try {
    //         const { email, password } = req.body;
    //         const user = await Users.findOne({ email });

    //         if (!user) {
    //             return res.status(404).json({ message: 'User not found' });
    //         }

    //         console.log(user)

    //         // Verify password
    //         const isPasswordValid = await bcrypt.compare(password, user.password);
    //         if (!isPasswordValid) {
    //             return res.status(401).json({ message: 'Invalid password' });
    //         }

    //         // Generate JWT token
    //         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    //         res.status(200).json({ message: 'Login successful', token });
    //     } catch (error) {
    //         res.status(500).json({ message: 'Error logging in', error });
    //     }
    // },

    login : asyncHandler(async (req, res) => {
        const { email, password } = req.body
    
        if (!email || !password) {
            res.status(400)
            throw new Error('Please provide email and password')
        }
    
        // Add `await` here to wait for the user to be fetched
        const user = await Users.findOne({ email })
    
        if (user && (await bcrypt.compare(password, user.password))) {
            const accessToken = jwt.sign(
                {
                    user: {
                        username: user.user_name, // Use `user_name` to match your schema
                        email: user.email,
                        id: user._id,
                        role : user.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '15m'
                }
            )
    
            res.status(200).json({ accessToken })
        } else {
            res.status(401)
            throw new Error('Invalid email or password')
        }
    })
};

module.exports = userController;
