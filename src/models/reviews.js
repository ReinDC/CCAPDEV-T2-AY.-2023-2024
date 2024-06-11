const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    reviewID: { // 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true,
        unique: true
    },
    reviewerID: { // ID of a existing account || 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true,
    },
    resturantID: { // Should be equal to a existing resturantID || 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true
    },
    rating: { // 0.00 
        type: Number,
        required: true,
        min: 0.0,
        max: 5.0
    }
});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;