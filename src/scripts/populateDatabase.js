const mongoose = require('mongoose');
const connectToMongo = require('./conn.js');
const User = require('../models/users.js');
const Restaurant = require('../models/resturants.js');
const Review = require('../models/reviews.js');
const sampleUsers = require('./sampleData/userData.js');
const sampleRestaurants = require('./sampleData/resturantData.js');
const sampleReviews = require('./sampleData/reviewData.js');

async function dropDatabase() { // To clear the database first
    try {
        await mongoose.connection.dropDatabase();
        console.log('Database: Old DB Dropped successfully');
    } catch (error) {
        console.error('Database: Error dropping database', error);
    }
}

async function populateDatabase() {
    try {
        await dropDatabase();

        for (const userData of sampleUsers) {
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

    } catch (error) {
        console.error('Database: Error populating database', error);
    } finally {
        console.log('Database: Population function completed');
    }
}

module.exports = populateDatabase;
