const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    candidate_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a candidate ID'],
        ref: 'Candidate', // Reference to the Candidate model
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide a job ID'],
        ref: 'Job', // Reference to the Job model
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending', // Default status is pending
    },
    coverLetter: {
        type: String,
        required: false, // Optional field for cover letter
    },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
