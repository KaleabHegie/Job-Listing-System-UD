const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , 'Please provide skill'],
    },
    description : {
        type : String,
        required : [true , 'Please provide description'],
    }
}, { timestamps: true })

module.exports = mongoose.model('Skills' , skillSchema)