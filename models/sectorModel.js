const mongoose = require('mongoose');

const sectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
    }
}, { timestamps: true }); 

module.exports = mongoose.model('Sector', sectorSchema);
