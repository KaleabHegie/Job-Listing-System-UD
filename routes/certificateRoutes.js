const express = require('express');
const router = express.Router();
const {
    createCertificate,
    getCertificates,
    getSingleCertificate,
    updateCertificate,
    deleteCertificate
} = require('../controllers/certificateController');

router.route('/')
    .post(createCertificate)        
    .get(getCertificates);          

router.route('/:certificateId')
    .get(getSingleCertificate)           
    .put(updateCertificate)        
    .delete(deleteCertificate);     

module.exports = router;