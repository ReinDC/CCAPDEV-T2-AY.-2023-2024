// Import required modules
const Router = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const validator = require('validator');
const User = require('../models/users'); // User model
const Resturant = require('../models/resturants'); // Restaurant model
const Review = require('../models/reviews'); // Review model

const router = Router();
router.use(express.json());

function isValidURL(url) {
    return validator.isURL(url);
}

// Route for rendering the login page
router.get("/", (req, res) => {
    res.render("login", {
        title: "Login",
    });
});

// Route for rendering the login page (same as above, but with explicit /login path)
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login",
    });
});

// Route for rendering the registration page
router.get("/register", (req, res) => {
    res.render("register", {
        title: "Register",
    });
});

// Route for rendering the logout page
router.get("/logout", (req, res) => {
    res.render("logout", {
        title: "Logout",
    });
});

// Route for viewing all establishments
router.get('/view-establishment', async (req, res) => {
    try {
        const userData = await User.findOne({username:req.query.user});
        const userType = userData.type
        const resturants = await Resturant.find().lean(); // Fetch all resturants
        res.render('view-establishment', {
            type: userType, // Pass the username to the view
            resturants: resturants, // Pass resturants to the view
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Route for rendering the user profile page
router.get("/user-profile", (req, res) => {
    res.render("user-profile", {
        title: "User profile",
    });
});

// Route for rendering the edit profile page
router.get("/edit-profile", (req, res) => {
    res.render("edit-profile", {
        title: "Edit profile",
    });
});

// Route for rendering the about us page
router.get("/about-us-page", (req, res) => {
    res.render("about-us-page", {
        title: "About Us",
    });
});

// Route for rendering the search establishments page
router.get("/search-establishments", (req, res) => {
    res.render("search-establishment", {
        title: "Search establishments",
    });
});

// Route for rendering the edit review page
router.get("/edit-review", async (req, res) => {
    const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';
    const review = await Review.findOne({ reviewID: message });
    const reviewer = await User.findOne({ userID: review.reviewerID });
    
    // console.log(user);

    res.render("edit-review", {
        title: "Edit Review",
        message: message,
        reviewer: reviewer,
        review: review,
    });
});

// Route for editing details of a specific restaurant
router.get("/edit-details", async (req, res) => {
    try {
        const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';
        const resturantName = message;
        const resturant = await Resturant.findOne({ resturantName: resturantName });   
        res.render("edit-details", {
            title: "Edit details",
            message: message,
            chosenResturant: resturant
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route for creating a review for a specific restaurant
router.get("/create-review", async (req, res) => {
    try {
        // Get the 'message' query parameter from the request and decode it. 
        // If 'message' is not provided, default to 'No message'.
        const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';

        // Use the 'message' as the restaurant name to search for the restaurant in the database.
        const resturantName = message;
        const resturant = await Resturant.findOne({ resturantName: resturantName }); 

        // Render the 'create-review' page and pass the following data:
        // - title: The title of the page.
        // - message: The decoded message which contains the restaurant name.
        // - chosenResturant: The restaurant object found in the database.
        res.render("create-review", {
            title: "Create-review",
            message: message,
            chosenResturant: resturant
        });
    } catch (error) {
        // If an error occurs, respond with a 500 status code and the error message.
        res.status(500).json({ message: error.message });
    }
});


// Route for viewing reviews of a specific establishment
router.get("/view-establishment-reviews", async (req, res) => {
    try {
        // Get the 'message' query parameter from the request and decode it.
        // If 'message' is not provided, default to 'No message'.
        const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';   
        
        // Use the 'message' as the restaurant name to search for the restaurant in the database.
        const resturantName = message;
        const resturant = await Resturant.findOne({ resturantName: resturantName });
        
        // Find all reviews for the found restaurant using its ID.
        const reviews = await Review.find({ resturantID: resturant.resturantID });

        // Extract reviewer IDs from the reviews.
        const reviewerIDs = reviews.map(review => review.reviewerID);
        
        // Find users who have written reviews using their IDs.
        const users = await User.find({ userID: { $in: reviewerIDs } });
        
        // Assign the found restaurant to a variable for clarity.
        const chosenResturant = resturant;

        // Render the 'view-establishment-reviews' page and pass the following data:
        // - title: The title of the page.
        // - reviews: The list of reviews for the restaurant.
        // - message: The decoded message which contains the restaurant name.
        // - users: The list of users who wrote the reviews.
        // - chosenResturant: The restaurant object found in the database.
        res.render('view-establishment-reviews', {
            title: "View establishment reviews",
            reviews: reviews, // Pass reviews to the view
            message: message, // Pass restaurant name to the view
            users: users, // Pass users who reviewed to the view
            chosenResturant: chosenResturant // Pass chosen restaurant to the view
        });
    } catch (err) {
        // If an error occurs, respond with a 500 status code and the error message.
        res.status(500).json({ message: err.message });
    }
});


// Route to get the image of a specific restaurant
router.post("/get-image", async (req, res) => {
    try {
        // Extract the restaurant name from the request body.
        const resturantName = req.body.resturantName;
        
        // Find the restaurant in the database using the provided restaurant name.
        const resturant = await Resturant.findOne({ resturantName: resturantName });

        // If the restaurant is found, respond with a status 200 and send the image link.
        if (resturant) {
            res.status(200).send({ imgLink: resturant.resturantIMG });
        } else {
            // If the restaurant is not found, respond with a status 404.
            res.status(404);
            console.log("\nNot Found");
        }
    } catch (error) {
        // If an error occurs, log the error and respond with a status 500 and the error message.
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


// Route to handle form submission for login
router.post('/submit-form-login', async (req, res) => {
    try {
        // Extract username and password from the request body
        const username = req.body.username;
        const password = req.body.password;

        // Find a user in the database with the provided username and password
        const user = await User.findOne({ username: username, password: password });

        // If a user is found, respond with a status 200 and a success message
        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            // If no user is found, respond with a status 404 and a 'User not found' message
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // If an error occurs, log the error and respond with a status 500 and the error message
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

// Route to handle form submission for register
router.post('/submit-form-register', async (req, res) => {
    try {
        const { username, password, description, profilePic, type } = req.body;

        // Count documents in the User collection to generate a new userID
        const userID = await User.countDocuments() + 1;
        const existingUser = await User.findOne({ username: username });

        if (!existingUser){
            const userObj = {
                userID: userID,
                username: username,
                password: password,
                type: type
            };

            if (description && description.trim() !== "") {
                userObj.description = description;
            }

            if (profilePic && isValidURL(profilePic) && profilePic.trim() !== "") {
                userObj.profpic = profilePic;
            }

            // Create a new user instance with the constructed user object
            const newUser = await User.create(userObj);

            // Respond with a status code and message
            res.sendStatus(201)
        } 

        else{ // Duplicate
            res.sendStatus(409) 
        }
        
    } catch (error) {
        console.error(error);
        res.status(500)
    }
});

router.post('/search', async (req, res) => {
    try {
        const { search } = req.body;
        const searchM = new RegExp(search, 'i'); // Create a case-insensitive regular expression from the search string
        const resturants = await Resturant.find({ resturantName: searchM });
        
        if (resturants.length != 0) {
            res.status(200).send({ resturants: resturants });
        } else {
            res.status(404).send({ message: "No restaurants found" }); // Set status to 404 and send a message
        }

    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' }); // Send an error message along with the status
    }
});

router.post("/mark-helpful", async (req, res) => {
    try {
        const { reviewID } = req.body;
        let review = await Review.findOne({ reviewID: reviewID }); // Use let for reassigning

        if (review) {
            await Review.updateOne({ reviewID: reviewID }, { $inc: { helpfulCount: 1 } });
            review = await Review.findOne({ reviewID: reviewID });
            res.status(200).send({ count: review.helpfulCount });
        } else {
            res.status(404).send({ message: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
});

router.post("/mark-nothelpful", async (req, res) => {
    try {
        const { reviewID } = req.body;
        let review = await Review.findOne({ reviewID: reviewID }); // Use let for reassigning

        if (review) {
            await Review.updateOne({ reviewID: reviewID }, { $inc: { notHelpfulCount: 1 } });
            review = await Review.findOne({ reviewID: reviewID });
            res.status(200).send({ count: review.notHelpfulCount });
        } else {
            res.status(404).send({ message: "Review not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred' });
    }
});


module.exports = router;
