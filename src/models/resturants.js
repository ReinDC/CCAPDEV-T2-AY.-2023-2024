const mongoose = require('mongoose');

const resturantSchema = new mongoose.Schema({
    resturantID: { // 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true,
        unique: true
    },
    resturantName: { 
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    resturantIMG: { // Link of the img
        type: String,
        required: true
    },
    ownerID: { // Should be equal to a userID 
        type: Number,
        required: true
    },
    rating: { // 0.00 
        type: Number,
        required: true
    },
    bestSellers: {
        type: [String],
        default: ["Carbonara", "Spanish Latte", "Pumpkin Spice"]
    },
    address: {
        type: String,
        default: "2401 Taft Ave, Malate, Manila, 1004 Metro Manila"
    }
});

const Resturant = mongoose.model('Resturants', resturantSchema);

module.exports = Resturant;