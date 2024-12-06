const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Company name is required'],
        },
        description: {
            type: String,
            required: [true, 'Company description is required'],
        },
        location: {
            type: String,
            required: [true, 'Company location is required'],
        },
        website: {
            type: String,
        },
        email: {
            type: String,
            required: [true, 'Contact email is required'],
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        phone: {
            type: String,
            required: [true, 'Contact email is required'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Company', companySchema);
