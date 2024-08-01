const mongoose = require('mongoose');
const connectToMongo = require('./conn.js');
const User = require('../models/users.js');
const Restaurant = require('../models/resturants.js');
const Review = require('../models/reviews.js');
const Response = require('../models/ownerResponse.js');
const sampleUsers = require('./sampleData/userData.js');
const sampleRestaurants = require('./sampleData/resturantData.js');
const sampleResponses = require("./sampleData/ownerResponse.js");
const sampleReviews = require('./sampleData/reviewData.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function dropDatabase() {
    try {
        await mongoose.connection.dropDatabase();
        console.log('Database: Old DB Dropped successfully');
    } catch (error) {
        console.error('Database: Error dropping database', error);
    }
}

async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

async function populateDatabase() {
    try {
        await dropDatabase();

        for (const userData of sampleUsers) {
            const hashedPassword = await hashPassword(userData.password);
            userData.password = hashedPassword;
            const user = new User(userData);
            await user.save();
        }

        for (const restaurantData of sampleRestaurants) {
            const restaurant = new Restaurant(restaurantData);
            await restaurant.save();
        }

        for (const reviewData of sampleReviews) {
            const review = new Review(reviewData);
            await review.save();
        }

        for (const responseData of sampleResponses) {
            const response = new Response(responseData);
            await response.save();
        }

        console.log('Database: Population function completed');
    } catch (error) {
        console.error('Database: Error populating database', error);
    }
}

module.exports = populateDatabase;
