const mongoose = require('mongoose')

const personalProjectSchema = new mongoose.Schema({
    candidate_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , 'Please provide Candidate'],
        ref : 'Candidate'
    },
    name : {
        type : String,
        required : [true , 'Please provide name'],
    },
    description : {
        type : String,
        required : [true , 'Please provide description'],
    },
    link : {
        type : String,
        required : false,
    }
}, { timestamps: true })


module.exports = mongoose.model('PersonalProject' , personalProjectSchema)