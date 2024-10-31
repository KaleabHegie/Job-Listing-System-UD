
const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
    candidate_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true , 'Please provide Candidate'],
        ref : 'Candidate',
    },
    company_name : {
        type : String,
        required : [true , 'Please provide company name'],      
    },
    position : {
        type : String,  
        required : [true , 'Please provide position'],
    },
    from : {    
        type : Date,
        required : [true , 'Please provide from'],
    },
    to : {
        type : Date,
        required : [true , 'Please provide to'],
    },
    description : {
        type : String,
        required : [true , 'Please provide description'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Experience' , experienceSchema)