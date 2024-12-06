const express = require('express')
const mongoose = require('mongoose')


const jobSchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: [true, 'Please select a valid company'],
    },
    title: {
        type: String,
        required: [true, 'Please provide title'],
    },
    description: {
        type: String,
        required: [true, 'Please provide description'],
    },
    vacancy: {
        type: Number,
        required: [true, 'Please provide vacancy'],
    },
    skills: [
        {
            name: {
                type: String,
                required: [true, 'Please provide name'],
            },
        },
    ],
    sector: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSector',
        required: [true, 'Please select a valid sector'],
    },
    location: {
        type: String,
        required: [true, 'Please provide location'],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Please provide user'],
    },
    active: {
        type: Boolean,
        default: true,
    },
    salary: {
        type: String,
        required: [true, 'Please provide salary'],
    },

}, { timestamps: true }); // Enable timestamps


module.exports = mongoose.model('Job' , jobSchema)