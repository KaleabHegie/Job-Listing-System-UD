const asyncHandler = require('express-async-handler');
const Users = require('../models/userModel');
const Candidate = require('../models/candidateModel');
const Application = require('../models/applicationModel');
const bcrypt = require('bcrypt');





//@desc Get all users
//@route GET /api/users
//@access Public
const getAllUsers = asyncHandler( async (req, res) => {
    const users = await Users.find()
    res.status(200).json(users)
})





//@desc Get a single user
//@route GET /api/users/:id
//@access Public
const getSingleUser = asyncHandler( async (req, res) => {
    const user = await Users.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    res.status(200).json(user)
})




//@desc Update a user
//@route PUT /api/users/:id
//@access Public
const updateUser = asyncHandler( async (req, res) => {
    
    const user = await Users.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    
    const updatedUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    
    
    res.status(200).json(updatedUser)
})




//@desc Delete a user
//@route DELETE /api/users/:id
//@access Public
const deleteUser = asyncHandler( async (req, res) => {    
    const user = await Users.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new Error('User not found')
    }
    
    await user.deleteOne()
    res.status(200).json(user)
})




const getApplication = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const applications = await Application.findById(id)
    console.log(applications)
    res.status(200).json(applications);
});



const getAllApplication = asyncHandler(async (req, res) => {

    const applications = await Application.find()

    res.status(200).json(applications);
});






module.exports = {  
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
    getAllApplication,
    getApplication

}