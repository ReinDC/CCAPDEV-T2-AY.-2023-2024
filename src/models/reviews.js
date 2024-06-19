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
    reviewContent: { // Review Content
        type: String,
        required: true,
    },
    reviewTitle: { // Review Title
        type: String,
        required: true,
    },
    isRecommended: {  // true for Reccomended | false for not reccomended
        type: Boolean,
        required: true
    },
    helpfulCount: {  // Count for helpful
        type: Number,
        required: true
    },
    notHelpfulCount: {  // Count for not helpful
        type: Number,
        required: true
    }
});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;