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
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', applicationSchema);
