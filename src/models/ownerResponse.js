const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
    responseID: { // 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true,
        unique: true
    },
    ownerID: { // ID of a existing owner account || 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true,
    },
    resturantID: { // Should be equal to a existing resturantID || 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true
    },
    responseContent: { // Review Content
        type: String,
        required: true,
    },
    responseTitle: { // Review Title
        type: String,
        required: true,
    }
});

const Response = mongoose.model('Response', responseSchema);

module.exports = Response;