const express = require('express')
const mongoose = require('mongoose')
const { use, options } = require('../routes/jobRoutes')
const Users = require('./userModel');


const companySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Please provide name'],
    },
    about : {
        type : String,
        required : [true , 'Please provide about'],
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
    website : { 
        type : String,
        required : [true , 'Please provide website'],
    },
    logo : {
        type : String,  
        required : [true , 'Please provide logo'],
    },
    slogan : {
        type : String,
        required : [true , 'Please provide slogan'],
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true,
        match: [/.+@.+\..+/, 'Please provide a valid email address'],
    },
    phone : {
        type : String,
        required : [true , 'Please provide phone'],
    },
    since : {
        type : Date,
        required : [true , 'Please provide since'],
    },
    recruiters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide recruiters'],
    }]
}, { timestamps: true })



module.exports = mongoose.model('Company' , companySchema)