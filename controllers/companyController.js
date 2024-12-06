const asyncHandler = require('express-async-handler');
const Company = require('../models/companyModel');

// Create a new company
const createCompany = asyncHandler(async (req, res) => {
    const { name, description, location, website, email , phone } = req.body;

    const company = new Company({
        name,
        description,
        location,
        website,
        email,
        phone
    });

    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
});

// Get all companies
const getAllCompanies = asyncHandler(async (req, res) => {
    const companies = await Company.find();
    res.status(200).json({ message: 'All companies', data: companies });
});

// Get a specific company by ID
const getCompanyById = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    res.status(200).json(company);
});

// Update a company by ID
const updateCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCompany);
});

// Delete a company by ID
const deleteCompany = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id);

    if (!company) {
        res.status(404);
        throw new Error('Company not found');
    }

    await company.deleteOne();
    res.status(204).json({ message: 'Company removed' });
});

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};
