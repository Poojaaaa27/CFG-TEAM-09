const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    village: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    landSize: {
        type: Number,
        required: true
    },
    landOwnership: {
        type: String,
        enum: ['Owned', 'Leased', 'Rented'],
        required: true
    },
    irrigationMethod: {
        type: String,
        required: true
    },
    projectType: {
        type: String,
        enum: ['Horticulture', 'Livestock'],
        required: true
    },
    cropType: {
        type: String,
        required: true
    },
    joinDate: {
        type: Date,
        required: true
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    totalProduction: {
        type: Number,
        default: 0
    },
    totalSales: {
        type: Number,
        default: 0
    },
    trainingAttendance: {
        type: Number,
        default: 0
    },
    cultivation: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cultivation"
    }],
    trained: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
farmerSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Farmer', farmerSchema);
