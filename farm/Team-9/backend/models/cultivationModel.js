const mongoose = require('mongoose');

const cultivationSchema = new mongoose.Schema({
    Crop: {
        type: String,
        required: true
    },
    Crop_Year: {
        type: Number,
        required: true
    },
    Season: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Area: {
        type: Number, 
        required: true
    },
    Production: {
        type: Number, 
        required: true
    },
    Annual_Rainfall: {
        type: Number, // in mm
        required: true
    },
    Fertilizer: {
        type: String,
        required: true
    },
    Pesticide: {
        type: String,
        required: true
    },
    Yield: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('Cultivation', cultivationSchema);
