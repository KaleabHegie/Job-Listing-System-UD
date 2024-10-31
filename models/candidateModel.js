const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide user'],
        ref: 'User'
    },
    skill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skills', 
        required: false
    }]
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
