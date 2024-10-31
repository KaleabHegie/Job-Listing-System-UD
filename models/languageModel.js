const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    candidate_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , 'Please provide Candidate'],
        ref : 'Candidate'
    },
    name : {
        type : String,
        required : [true , 'Please provide name'],
    },
    level : {
        type : String,
        required : [true , 'Please provide level'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Language' , languageSchema)



