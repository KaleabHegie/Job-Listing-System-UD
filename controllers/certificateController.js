const asyncHandler = require('express-async-handler');
const Certificate = require('../models/certificateModel');
const Candidate = require('../models/candidateModel');

// @desc Create a certificate for a candidate
// @route POST /api/candidates/:candidateId/certificates
// @access Private (Admin only)
const createCertificate = asyncHandler(async (req, res) => {
    const userId = req.user.id; 

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }
    
    const { name, description, date, issuing_organization, document } = req.body;

    if (!name || !description || !date || !issuing_organization || !document) {
        res.status(400);
        throw new Error('Please provide all required fields');
    }

    const certificate = new Certificate({
        candidate_id: candidate._id,
        name,
        description,
        date,
        issuing_organization,
        document
    });

    const savedCertificate = await certificate.save();
    res.status(201).json({
        message: 'Certificate created successfully',
        certificate: savedCertificate
    });
});

// @desc Get all certificates of a candidate
// @route GET /api/candidates/:candidateId/certificates
// @access Private (Admin only)
const getCertificates = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const certificates = await Certificate.find({ candidate_id: candidate._id });
    res.status(200).json({
        message: 'Candidate certificates retrieved',
        certificates,
    });
});

// @desc Get a single certificate of a candidate
// @route GET /api/candidates/:candidateId/certificates/:certificateId
// @access Private (Admin only)
const getSingleCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    res.status(200).json({
        message: 'Candidate certificate retrieved',
        certificate,
    });
});

// @desc Update a certificate of a candidate
// @route PUT /api/candidates/:candidateId/certificates/:certificateId
// @access Private (Admin only)
const updateCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    const { name, description, date, issuing_organization, document } = req.body;

    if (name) certificate.name = name;
    if (description) certificate.description = description;
    if (date) certificate.date = date;
    if (issuing_organization) certificate.issuing_organization = issuing_organization;
    if (document) certificate.document = document;

    const updatedCertificate = await certificate.save();

    res.status(200).json({
        message: 'Certificate updated successfully',
        certificate: updatedCertificate,
    });
});

// @desc Delete a certificate of a candidate
// @route DELETE /api/candidates/:candidateId/certificates/:certificateId
// @access Private (Admin only)
const deleteCertificate = asyncHandler(async (req, res) => {
    const { certificateId } = req.params;
    const userId = req.user.id;

    const candidate = await Candidate.findOne({ user_id: userId });
    if (!candidate) {
        res.status(404);
        throw new Error('Candidate not found');
    }

    const certificate = await Certificate.findById(certificateId);
    if (!certificate) {
        res.status(404);
        throw new Error('Certificate not found');
    }

    await Certificate.findByIdAndDelete(certificateId);

    res.status(200).json({
        message: 'Certificate removed from candidate',
    });
});

module.exports = {
    createCertificate,
    getCertificates,
    getSingleCertificate,
    updateCertificate,
    deleteCertificate,
};
