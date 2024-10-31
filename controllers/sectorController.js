const asyncHandler = require('express-async-handler');
const Sector = require('../models/sectorModel');

// Admin only
//@desc Create a new sector
//@route POST /api/sectors/create_sector
//@access Admin
const createSector = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        res.status(400);
        throw new Error('Please provide both name and description for the sector');
    }
    const newSector = new Sector({
        name,
        description
    });
    const savedSector = await newSector.save();
    res.status(201).json({
        message: 'Sector created successfully',
        id: savedSector._id,
        name: savedSector.name,
        description: savedSector.description,
    });
});

//@desc Get all sectors
//@route GET /api/sectors/all_sectors
//@access Admin
const getAllSectors = asyncHandler(async (req, res) => {
    const sectors = await Sector.find();
    res.status(200).json({
        message: 'Get all sectors',
        data: sectors 
    });
});

//@desc Get a single sector
//@route GET /api/sectors/:id
//@access Admin
const getSectorById = asyncHandler(async (req, res) => {
    const sector = await Sector.findById(req.params.id);
    
    if (!sector) {
        res.status(404);
        throw new Error('Sector not found');
    }

    res.status(200).json({
        message: 'Sector retrieved successfully',
        data: sector
    });
});

//@desc Update a sector
//@route PUT /api/sectors/:id
//@access Admin
const updateSector = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    // Check if the sector exists
    const sector = await Sector.findById(req.params.id);
    
    if (!sector) {
        res.status(404);
        throw new Error('Sector not found');
    }

    // Update the sector fields
    sector.name = name || sector.name; // Only update if provided
    sector.description = description || sector.description; // Only update if provided

    const updatedSector = await sector.save();

    res.status(200).json({
        message: 'Sector updated successfully',
        data: updatedSector
    });
});

//@desc Delete a sector
//@route DELETE /api/sectors/:id
//@access Admin
const deleteSector = asyncHandler(async (req, res) => {
    const sector = await Sector.findById(req.params.id);
    
    if (!sector) {
        res.status(404);
        throw new Error('Sector not found');
    }

    await Sector.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: 'Sector deleted successfully'
    });
});

module.exports = {  
    createSector,
    getAllSectors,
    getSectorById,
    updateSector,
    deleteSector
};
