const express = require('express')
const mongoose = require('mongoose')
const { use, options } = require('../routes/jobRoutes')


const jobSchema = new mongoose.Schema({
    company : {
        type : String,
        required : [true , 'Please provide company'],
    },
    title : {
        type : String,
        required : [true , 'Please provide title'],
    },
    description : {
        type : String,
        required : [true , 'Please provide description'],
    },
    vacancy : {
        type : Number,
        required : [true , 'Please provide vacancy'],
    },
    experience : {
        type : String,
        required : [true , 'Please provide experience'],
    },
    skills: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Skill'
    }],
    sector : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Sector',
        required : [true , 'Please provide sector'],
    },
    position : {
        type : String,
        required : [true , 'Please provide position'],
    },
    status : {
        type : String,
        enum : ['interview' , 'declined' , 'pending'],
        default : 'pending',
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Recruiter',
        required : [true , 'Please provide user'],
    }
})

module.exports = mongoose.model('Job' , jobSchema)