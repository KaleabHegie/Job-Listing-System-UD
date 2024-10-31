const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a user ID'],
        ref: 'User'
    },
    company_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a company ID'],
        ref: 'Company'
    }
}, { timestamps: true });

module.exports = mongoose.model('Recruiter', recruiterSchema);
