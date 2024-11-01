const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Please provide user'],
        ref: 'User'
    },
    skills : [{
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
    }],
    languages: [{
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
        level: {
            type: String,
            required: [true, 'Please provide level'],
        }
    }],
    certificates: [{
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
        },
        date: {
            type: Date,
            required: [true, 'Please provide date'],
        },
        issuing_organization: {
            type: String,
            required: [true, 'Please provide organization'],
        },
        document: {
            type: String,
            required: [true, 'Please provide document'],
        }
    }],
    experiences: [{
        company_name: {
            type: String,
            required: [true, 'Please provide company name'],      
        },
        position: {
            type: String,  
            required: [true, 'Please provide position'],
        },
        from: {    
            type: Date,
            required: [true, 'Please provide from date'],
        },
        to: {
            type: Date,
            required: [true, 'Please provide to date'],
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
        }
    }],
    educations: [{
        institution_name: {
            type: String,
            required: [true, 'Please provide institution name'],
        },
        degree: {
            type: String,
            enum: ['SSC', 'HSC', 'BCS', 'BS', 'MS', 'Mphil', 'PhD'],
            required: [true, 'Please provide degree'],
        },
        field_of_study: {
            type: String,
            required: [true, 'Please provide field of study'],
        },
        from: {
            type: Date,
            required: [true, 'Please provide from date'],
        },
        to: {
            type: Date,
            required: [true, 'Please provide to date'],
        },
        grade: {
            type: String,
            required: [true, 'Please provide grade'],
        },
        description: {
            type: String,
            required: [true, 'Please provide description'],
        }
    }],
    personalProjects: [{
        name: {
            type: String,
            required: [true, 'Please provide project name'],
        },
        description: {
            type: String,
            required: [true, 'Please provide project description'],
        },
        link: {
            type: String,
            required: false,
        }
    }],
    active : {
        type : Boolean,
        default : true
    }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
