const express = require('express');
const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} = require('../controllers/companyController');

const router = express.Router();

// Route to create a new company
router.post('/create_company', createCompany);

// Route to get all companies
router.get('/get_all_companies', getAllCompanies);

// Route to get a specific company by ID
router.get('/get_company/:id', getCompanyById);

// Route to update a specific company by ID
router.patch('/update_company/:id', updateCompany);

// Route to delete a specific company by ID
router.delete('/delete_company/:id', deleteCompany);

module.exports = router;
