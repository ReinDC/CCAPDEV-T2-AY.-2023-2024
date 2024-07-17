const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    userID: { // 0001, 0002, 0003, ... , XXXX
        type: Number,
        required: true,
        unique: true
    },
    username: { // Userame of the review
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    type: { // Reviewer || Owner
        type: String,
        required: true
    },
    password: { // Should be hashed
        type: String,
        required: true,
    },
    profpic: { // link to the picture
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
    },
    description: {
        type: String,
        default: 'No description provided.'
    },
    deleted: {
        type: Boolean,
        default: 0
    }
});

const User = mongoose.model('Users', userSchema);

module.exports = User;