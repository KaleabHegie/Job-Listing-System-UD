const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const Company = require('../models/companyModel'); 
const Candidate = require('../models/candidateModel');
const Recruiter = require('../models/recruiterModel')



//@desc Create a company
//@route POST /api/company
//@access Public
const registerCompany = asyncHandler(async (req, res) => {
    const { 
        name, 
        about, 
        address, 
        city, 
        country, 
        website, 
        logo, 
        slogan, 
        email, 
        phone, 
        since, 
        recruiters 
    } = req.body;

    // Validate required fields
    if (!name || !about || !address || !city || !country || !website || !logo || 
        !slogan || !email || !phone || !since || !recruiters) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    // Check if company with the same name or email already exists
    const existingCompany = await Company.findOne({ name });
    if (existingCompany) {
        res.status(400);
        throw new Error('Company already exists with this name');
    }

    const existingEmail = await Company.findOne({ email });
    if (existingEmail) {
        res.status(400);
        throw new Error('Company already exists with this email');
    }


    // Create a new company instance
    const newCompany = new Company({
        name,
        about,
        address,
        city,
        country,
        website,
        logo,
        slogan,
        email,
        phone,
        since,
        recruiters // this should be an array of user IDs
    });

    // Save the company to the database
    const savedCompany = await newCompany.save();

    await Users.updateMany(
        { _id: { $in: recruiters } }, // Find users whose IDs are in the recruiters array
        { $set: { role: 'recruiter' } } // Set their role to recruiter
    );

    await Candidate.deleteMany({ user_id: { $in: recruiters } });

    await Recruiter.insertMany(
        recruiters.map(userId => ({ user_id: userId, company_id: savedCompany._id }))
    );

    // Respond with the created company details (excluding sensitive information)
    res.status(201).json({
        message : 'Company registered successfully',
        id: savedCompany._id,
        name: savedCompany.name,
        email: savedCompany.email,
        phone: savedCompany.phone,
        // You can add more fields as necessary
    });
});




//@desc Update a company
//@route PUT /api/company/:id
//@access Private(company admin only)
const updateCompanyProfile = asyncHandler( async (req, res) => {
    
    const userId = req.user.id; 

    const recruiter = await Recruiter.findOne({ user_id: userId });
    const { recruiterId } = recruiter._id;

    const company_id = req.params.id;

    console.log(company_id , recruiter.company_id.toString())
    if (company_id !== recruiter.company_id.toString()) {
        res.status(400)
        throw new Error('You are not authorized to update this company')
    }

    
    if (!recruiter) {
        res.status(400)
        throw new Error('User not found')
    }
    
    const updateCompany = await Company.findByIdAndUpdate(company_id, req.body, {
        new: true
    })
    
    
    res.status(200).json({
        message : "Company Profile updated successfully",
        data : updateCompany
        
})
})

module.exports = {
    registerCompany,
    updateCompanyProfile
};

