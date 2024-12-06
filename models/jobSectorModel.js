const express = require('express')
const mongoose = require('mongoose')


const jobSectorSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , 'Please provide title'],
    },
    description : {
        type : String,
        required : [true , 'Please provide description'],
    },
    iconPath : {
        type : String,
        required : false 
    },
    iconColor : {
        type : String,
        required : false ,
    }
})

module.exports = mongoose.model('JobSector' , jobSectorSchema)