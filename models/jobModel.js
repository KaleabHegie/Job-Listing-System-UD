const express = require('express')
const mongoose = require('mongoose')


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
    skills : [{
        name: {
            type: String,
            required: [true, 'Please provide name'],
        },
    }],
    sector : {
        type : String,
        required : [true , 'Please provide sector'],
    },
    position : {
        type : String,
        required : [true , 'Please provide position'],
    },
    requirements : {
        type : String,
        required : [true , 'Please provide requirements'],
    },
    location : {
        type : String,
        required : [true , 'Please provide location'],
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Users',
        required : [true , 'Please provide user'],
    },
    active : {
        type : Boolean,
        default : true
    }
})

module.exports = mongoose.model('Job' , jobSchema)