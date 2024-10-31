const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
    candidate_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , 'Please provide Candidate'],
        ref : 'Candidate'
    },
    institution_name : {
        type : String,
        required : [true , 'Please provide institution_name'],
    },
    degree : {
        type : String,
        enum: ['SSC', 'HSC', 'BCS', 'BS', 'MS', 'Mphil', 'PhD'],
        required : [true , 'Please provide degree'],
    },
    field_of_study : {
        type : String,
        required : [true , 'Please provide field of study'],
    },
    from : {
        type : Date,
        required : [true , 'Please provide from'],
    },
    to : {
        type : Date,
        required : [true , 'Please provide to'],
    },
    grade : {
        type : String,
        required : [true , 'Please provide grade'],
    },
    description : {
        type : String,
        required : [true , 'Please provide description'],
    }
}, { timestamps: true })


module.exports = mongoose.model('Education' , educationSchema)