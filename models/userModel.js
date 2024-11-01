const express = require('express')
const mongoose = require('mongoose')




const userSchema = new mongoose.Schema({
    first_name : {
        type : String,
        required : [true , 'Please provide first name'], 
    },
    last_name : {
        type : String,
        required : [true , 'Please provide last name'], 
    },
    user_name : {
        type : String,
        required : [true , 'Please provide user name'], 
    },
    date_of_birth : {
        type : Date,
        required : [true , 'Please provide date of birth'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address'],
    },
    phone : {
        type : String,
        required : [true , 'Please provide phone number'],
    },
    address : {
        type : String,
        required : [true , 'Please provide address'],
    },
    city : {
        type : String,
        required : [true , 'Please provide city'],
    },
    country : {
        type : String,
        required : [true , 'Please provide country'],
    },
    password : {                
        type : String,
        required : [true , 'Please provide password'],
    },
    photo : {
        type : String,
        required : [true , 'Please provide photo'],
    },
    role : {
        type : String,
        enum : ['recruiter' , 'candidate' ,  'admin'],
        default : 'candidate'
    },
    active : {
        type : Boolean,
        default : true
    }
}, { timestamps: true })

module.exports = mongoose.model('Users' , userSchema)
