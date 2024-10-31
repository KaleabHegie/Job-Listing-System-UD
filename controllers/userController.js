const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const Candidate = require('../models/candidateModel');
const bcrypt = require('bcrypt');
const { check , validationResult } = require('express-validator');



//@desc register  users
//@route register /api/users/register_user
//@access Public
const registerUser = [
    check('first_name')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2 }).withMessage('First name must be at least 2 characters long'),

   check('last_name')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2 }).withMessage('Last name must be at least 2 characters long'),

  check('user_name')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),

  check('date_of_birth')
    .notEmpty().withMessage('Date of birth is required')
    .isDate().withMessage('Date of birth must be a valid date'),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Email must be valid'),

  check('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Phone number must be valid'),

  check('address')
    .trim()
    .notEmpty().withMessage('Address is required'),

  check('city')
    .trim()
    .notEmpty().withMessage('City is required'),

  check('country')
    .trim()
    .notEmpty().withMessage('Country is required'),

  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  check('photo')
    .optional() // Assuming photo is optional
    .isURL().withMessage('Photo must be a valid URL'),

  check('role')
    .optional()
    .isIn(['admin', 'candidate', 'recruiter']).withMessage('Role must be either admin, candidate, or recruiter'),
    
    asyncHandler(async (req, res) => {

    const { first_name, last_name, user_name, date_of_birth, email, phone, address, city, country, password, photo , role } = req.body;

    if (!first_name || !last_name || !user_name || !date_of_birth || !email || !phone || !password || !photo) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const userAvailable = await Users.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error('User already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await Users.create({
        first_name,
        last_name,
        user_name,
        date_of_birth,
        email,
        phone,
        address,
        city,
        country,
        password: hashPassword,
        photo,
        role
    });

    if (user.role === 'candidate' ) {
        await Candidate.create({
            user_id: user._id,
            skill: []  
        });
    }

    res.status(201).json({
        message: 'User registered successfully',
        data: user
    });  
})]




//@desc Update a user
//@route PUT /api/users/:id
//@access Public
const updateProfile = asyncHandler( async (req, res) => {
    
    const userId = req.user.id; 

    const candidate = await Candidate.findOne({ user_id: userId });
    const { candidateId } = candidate._id;

    if(req.body.password) {
        const { password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);
    }
    
    if (!candidate) {
        res.status(400)
        throw new Error('User not found')
    }
    
    const updatedUser = await Users.findByIdAndUpdate(userId, req.body, {
        new: true
    })
    
    
    res.status(200).json({
        message : "Profile updated successfully",
        data : updatedUser
        
})
})



module.exports = {  
    registerUser,
    updateProfile
}