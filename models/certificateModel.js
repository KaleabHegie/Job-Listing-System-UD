const mongoose = require('mongoose')

const certificateSchema = new mongoose.Schema({
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
    date : {
        type : Date,
        required : [true , 'Please provide date'],
    },
    issuing_organization : {
        type : String,
        required : [true , 'Please provide organization'],
    },
    document : {
        type : String,
        required : [true , 'Please provide document'],
    }
}, { timestamps: true })


module.exports = mongoose.model('Certificate' , certificateSchema)