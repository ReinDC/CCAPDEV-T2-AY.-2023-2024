// Essential libraries
const express = require('express');
const Router = require('express');

// Other libraries
const bcrypt = require('bcrypt');
const validator = require('validator');
const session = require('express-session');

// Mongoose Models
const User = require('../models/users'); // User model
const Resturant = require('../models/resturants'); // Restaurant model
const Review = require('../models/reviews'); // Review model
const Response = require('../models/ownerResponse'); //Owner response model

const router = Router();
router.use(express.json());

router.use((req, res, next) => {
    res.locals.username = req.session.username || null;
    next();
});

function isValidURL(url) { // For registrarion
    return validator.isURL(url);
}

// Route for rendering the login page
router.get("/", (req, res) => {
    if(!req.session.username){
        res.render("login", {
            title: "Login",
        });
    } else {
        res.redirect('/user-profile'); 
    }
});

// Route for rendering the login page (same as above, but with explicit /login path)
router.get("/login", (req, res) => {
    if(!req.session.username){
        res.render("login", {
            title: "Login",
        });
    } else {
        res.redirect('/user-profile'); 
    }
});

// Route for rendering the registration page
router.get("/register", async (req, res) => {
    if(!req.session.username){
        res.render("register", {
            title: "Register",
        });
    } else {
        res.redirect('/user-profile'); 
    }
});

// Route for rendering the logout page
router.get('/logout', (req, res) => {
    if(req.session.username){
        res.render("logout", {
            title: "logout",
        });
    } else {
        res.redirect('/login?unauthenticated=true'); 
    }

});

// Route for viewing all establishments
router.get('/view-establishment', async (req, res) => {
    const resturants = await Resturant.find().lean(); // Fetch all resturants

    if(req.session.username){
        const userData = await User.findOne({username: req.session.username});

        res.render('view-establishment', {
            type: userData.type, // Pass the type of the user to the view
            userID: userData.userID.toString(),
            resturants: resturants, // Pass resturants to the view
        });

    } else {

        res.render('view-establishment', {
            resturants: resturants, // Pass resturants to the view
        });
    }
});

// Route for rendering the user profile page
router.get("/user-profile", async (req, res) => {
    if (req.session.username){
        const user = await User.findOne({ username: req.session.username });   
        const reviews = await Review.find({ reviewerID: user.userID, deleted: false});
        let resturantNames = [];
        for(let i = 0; i < reviews.length; i++){
            let resto = await Resturant.findOne({resturantID: reviews[i].resturantID});
            resturantNames.push(resto.resturantName);
        }
        res.render('user-profile', { 
            title: "User profile",
            user: user,
            reviews: reviews,
            resturantNames: resturantNames,
        });
    } else {
        res.redirect('/login?unauthenticated=true'); 
    }
});

// Route for rendering the edit profile page
router.get("/edit-profile", async (req, res) => {
    if (req.session.username){
        const user = await User.findOne({ username: req.session.username });

        res.render("edit-profile", { 
            title: "Edit profile",
            user: user,
        });
    } else {
        res.redirect('/login?unauthenticated=true'); 
    }
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
    if (req.session.username){
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
    } else {
        res.redirect('/login?unauthenticated=true'); 
    }
});

// Route for editing details of a specific restaurant
router.get("/edit-details", async (req, res) => {

    if(req.session.username){
        try {
            const name = req.query.name ? decodeURIComponent(req.query.name) : 'No name';
            const resturantName = name;
            const resturant = await Resturant.findOne({ resturantName: resturantName });   
            res.render("edit-details", {
                title: "Edit details",
                chosenResturant: resturant
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    else{
        res.redirect('/login?unauthenticated=true'); 
    }
    
});

// Route for creating a review for a specific restaurant
router.get("/create-review", async (req, res) => {
    if(req.session.username){
        try {
            // Get the 'name' query parameter from the request and decode it. 
            // If 'name' is not provided, default to 'No name'.
            const name = req.query.name ? decodeURIComponent(req.query.name) : 'No name';
    
            // Use the 'message' as the restaurant name to search for the restaurant in the database.
            const resturantName = name;
            const resturant = await Resturant.findOne({ resturantName: resturantName }); 
    
            // Render the 'create-review' page and pass the following data:
            // - title: The title of the page.
            // - message: The decoded message which contains the restaurant name.
            // - chosenResturant: The restaurant object found in the database.
            res.render("create-review", {
                title: "Create-review",
                chosenResturant: resturant
            });
        } catch (error) {
            // If an error occurs, respond with a 500 sendStatus code and the error message.
            res.status(500).json({ message: error.message });
        }
    } else {
        res.redirect('/login?unauthenticated=true'); 
    }
});


// Route for viewing reviews of a specific establishment
router.get("/view-establishment-reviews", async (req, res) => {
    try {
        // Get the 'name' query parameter from the request and decode it.
        // If 'name' is not provided, default to 'No name'.
        let user, userID;

        if(req.session.username){
            user = await User.findOne({ username: req.session.username});
            userID = user.userID;
        }
        else{
            userID = -1;
        }

        const name = req.query.name ? decodeURIComponent(req.query.name) : 'No name';   
        
        // Use the 'message' as the restaurant name to search for the restaurant in the database.
        const resturantName = name;
        const resturant = await Resturant.findOne({ resturantName: resturantName });
        
        // Find all reviews for the found restaurant using its ID.
        const reviews = await Review.find({ resturantID: resturant.resturantID });

        // Extract reviewer IDs from the reviews.
        const reviewerIDs = reviews.map(review => review.reviewerID);

        const reponses = await Response.find({ resturantID: resturant.resturantID});
        
        // Find users who have written reviews using their IDs.
        let users;
        if(userID){
            users = await User.find({ userID: { $in: reviewerIDs } });
        }
        
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
            users: users, // Pass users who reviewed to the view
            chosenResturant: chosenResturant, // Pass chosen restaurant to the view
            currentUserID: userID
        });
    } catch (err) {
        // If an error occurs, respond with a 500 sendStatus code and the error message.
        res.status(500).json({ message: err.message });
    }
});


router.post("/get-reviews", async (req, res) => {
    try {
        const resturantName = req.body.resturantName;

        const resturant = await Resturant.findOne({ resturantName: resturantName });
        const reviews = await Review.find({ resturantID: resturant.resturantID, deleted: false }).lean();
        const reponses = await Response.find({ resturantID: resturant.resturantID}).lean();
        const users = await User.find({deleted: false}).lean();
        const user = await User.findOne({username: req.session.username});
        const owner = await User.findOne({userID: resturant.ownerID})

        res.status(200).send({reviews: reviews, responses: reponses, users: users, user: user, resturant: resturant, owner: owner});
    } catch (error) {
        res.sendStatus(404);
    }   
})

// Route to get the image of a specific restaurant
router.post("/get-image", async (req, res) => {
    try {
        // Extract the restaurant name from the request body.
        const resturantName = req.body.resturantName;
        
        // Find the restaurant in the database using the provided restaurant name.
        const resturant = await Resturant.findOne({ resturantName: resturantName });

        // If the restaurant is found, respond with a sendStatus 200 and send the image link.
        if (resturant) {
            res.status(200).send({ imgLink: resturant.resturantIMG });
        } else {
            // If the restaurant is not found, respond with a sendStatus 404.
            res.sendStatus(404);
            console.log("\nNot Found");
        }
    } catch (error) {
        // If an error occurs, log the error and respond with a sendStatus 500 and the error message.
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});


// Route to handle form submission for login

router.post('/submit-form-login', async (req, res) => {
    try {
        // Extract username and password from the request body
        const { username, password } = req.body;

        // Find a user in the database with the provided username
        const user = await User.findOne({ username: username });

        // If a user is found, compare the provided password with the hashed password in the database
        if (user && user.deleted == false ) {
            const result = await bcrypt.compare(password, user.password);

            if (result) {
                // Passwords match, set the username in the session
                req.session.username = user.username;
                res.sendStatus(200)
            } else {
                // Passwords do not match
                res.sendStatus(401)
            }
        } else {
            // No user is found with the provided username
            res.sendStatus(404)
        }
    } catch (error) {
        // If an error occurs, log the error and respond with a sendStatus 500 and the error message
        console.error(error);
        res.sendStatus(500)
    }
});

// Route to handle form submission for register
router.post('/submit-form-register', async (req, res) => {
    try {
        const { username, password, description, profilePic, type } = req.body;

        // Count documents in the User collection to generate a new userID
        const userID = await User.countDocuments() + 1;
        const existingUser = await User.findOne({ username: username });

        const saltRounds = 10;

        if (existingUser) {
            return res.sendStatus(409); // Duplicate user
        }

        // Hash the password
        await bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Error hashing password');
            }

            const userObj = {
                userID: userID,
                username: username,
                password: hash,
                type: type
            };

            if (description && description.trim() !== "") {
                userObj.description = description;
            }

            if (profilePic && isValidURL(profilePic) && profilePic.trim() !== "") {
                userObj.profpic = profilePic;
            }

            try {
                // Create a new user instance with the constructed user object
                await User.create(userObj);

                // Respond with a sendStatus code and message
                req.session.username = username;
                res.sendStatus(201);
            } catch (creationError) {
                console.error('Error creating user:', creationError);
                res.status(500).send('Error creating user');
            }
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).send('Error processing request');
    }
});

router.post('/search', async (req, res) => {
    try {
        const { search, searchTerm } = req.body;
        const searchValue = new RegExp(searchTerm, 'i');
        let userID;
        if(req.session.username){
            const user = await User.findOne({ username: req.session.username})
            userID = user.userID;
        } else {
            userID = -1;
        }

        let resturants;
        if(search == 'name'){
            resturants = await Resturant.find({ resturantName: searchValue });
        }
        else if(search == 'sellers'){
            resturants = await Resturant.find({ bestSellers: { $in: [searchValue] } });
        }
        
        if (resturants.length != 0) {
            res.status(200).send({ resturants: resturants, userID: userID });
        } else {
            res.status(404).send({ message: "No restaurants found" }); // Set sendStatus to 404 and send a message
        }

    } catch (error) {
        console.error(error);
        res.sendStatus(500).send({ error: 'An error occurred' }); // Send an error message along with the sendStatus
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
        res.status(500).send({ error: 'An error occurred' });
    }
});


router.post("/reviews-search", async (req, res) => {
    try {
        const { searchTerm, search, resturantName} = req.body;
        const rawSearch = new RegExp(search, 'i');
        const resturant = await Resturant.findOne({ resturantName: resturantName});
        let reviews;
        if(searchTerm == 'title'){
            reviews = await Review.find({reviewTitle: rawSearch, resturantID: resturant.resturantID});
        }
        else if(searchTerm == 'content'){
            reviews = await Review.find({reviewContent: rawSearch, resturantID: resturant.resturantID});
        }


        const users = [];
        for(let i = 0; i < reviews.length; i++){
            const id = reviews[i].reviewerID;
            const user = await User.findOne({userID: id});
            users[i] = user;
        }

        if (reviews.length != 0) {
            res.status(200).send({ reviews: reviews, users: users});
        } else {
            res.sendStatus(404)
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

router.post("/sign-out", (req, res) =>{
    req.session.destroy(err => {
        if (err) {
          return res.sendStatus(500)
        }
        res.sendStatus(200)
      });
})


router.post("/changepfp", async (req, res) =>{
    const username = req.session.username;
    const link = req.body.link;

    if(!isValidURL(link)){
        return res.sendStatus(500)
    }
    
    try {
        const result = await User.updateOne(
            { username: username }, 
            { $set: { profpic: link }}
        );
    
        if (result.nModified === 0) {
            return res.status(404).send({ message: 'User not found or no changes made' });
        }
    
        res.status(200).send({ message: 'Profile picture updated successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile picture'});
    }
})

router.post("/changeDesc", async(req, res) =>{
    const username = req.session.username;
    const desc = req.body.desc;

    try {
        const result = await User.updateOne(
            { username: username }, 
            { $set: { description: desc }}
        );

        if (result.nModified === 0) {
            return res.status(404).send({ message: 'User not found or no changes made' });
        }

        res.status(200).send({ message: 'Profile updated successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error updating profile picture'});
    }
})


router.post("/changeRestoDetails", async (req, res) =>{
    const {restoName, restoAdd, restoBestSellers} = req.body;

    try {
        const result = await Resturant.updateOne(
            { resturantName: restoName }, 
            { $set: { 
                        address: restoAdd,
                        bestSellers: restoBestSellers
                    }
            }
        );

        if (result.nModified === 0) {
            return res.status(404).send({ message: 'Resturant not found or no changes made' });
        }

        res.status(200).send({ message: 'Resturant updated successfully'});
    } catch (error) {
        res.status(500).send({ message: 'Error updating Resturant'});
    }
})

router.post("/submit-review", async (req, res) => {
    const username = req.session.username;
    try{

        const maxReviewID = await Review.findOne().sort({ reviewID: -1}).exec();
        const newReviewID = maxReviewID ? maxReviewID.reviewID + 1 : 1;
        const{resturantID, reviewContent, reviewTitle, isRecommended, helpfulCount, notHelpfulCount} = req.body;
        
        const user = await User.findOne({username}).exec();
        const reviewerID = user.userID;
        const newReview = new Review({

        reviewID: newReviewID,
        reviewerID: reviewerID,
        resturantID: resturantID,
        reviewContent: reviewContent,
        reviewTitle: reviewTitle, 
        isRecommended: isRecommended,
        helpfulCount: helpfulCount,
        notHelpfulCount: notHelpfulCount
    });

    await newReview.save();

    res.status(201).json({message:'Review submitted!'});

    }catch(error){
        console.error(error);
    }

})

router.post("/review-edit", async (req, res) => {
    const { reviewTitle, reviewContent, isRecommended, reviewID } = req.body;

    // Debugging: Print types and values
    // console.log("Type of reviewTitle: " + typeof reviewTitle);
    // console.log("Type of reviewContent: " + typeof reviewContent);
    // console.log("Type of isRecommended: " + typeof isRecommended);
    // console.log("Type of reviewID: " + typeof reviewID);

    // console.log("Type of reviewTitle: " + reviewTitle);

    try {
        const result = await Review.updateOne(
            { reviewID: reviewID },
            { 
                $set: {
                    reviewTitle: reviewTitle, 
                    reviewContent: reviewContent, 
                    isRecommended: isRecommended
                }
            }
        );
        if (result.nModified === 0) {
            return res.sendStatus(404)
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500)
    }
});

router.post("/delete", async (req, res) => {
    const { type, id } = req.body;
    let result;

    if(type == "resto"){
        result = await Resturant.updateOne({ resturantID: id}, {$set: {deleted: true}});

        if (result.nModified === 0) {
            return res.sendStatus(404)
        }

        res.sendStatus(200)

    } else if(type == "acc"){
        result = await User.updateOne({ userID: id}, {$set: {deleted: true}});

        if (result.nModified === 0) {
            return res.sendStatus(404)
        }

        req.session.destroy(err => {
            if (err) {
                return res.sendStatus(500)
            }
            res.sendStatus(200)
        }); 

    } else if(type == "review"){
        result = await Review.updateOne({ reviewID: id}, {$set: {deleted: true}});

        if (result.nModified === 0) {
            return res.sendStatus(404)
        }

        res.sendStatus(200)
    }
});

//from here on, still not sure about this, will revise. 
router.get("/owner-response", async (req,res) =>{
    if(req.session.username){
        const{reviewID, resturantID} = req.query;
        const review = await Review.findOne({reviewID});
        const chosenResturant = await Resturant.findOne({resturantID}).exec();
        res.render("owner-response", {
            reviewID, 
            resturantID, 
            chosenResturant,
            reviewTitle: review.reviewTitle,
            reviewContent: review.reviewContent
        });
    } else {
        res.redirect('/login?unauthenticated=true'); 
    }
    
});

router.post("/submit-response", async (req, res) => {
    //const username = req.session.username;
    //const usertype = req.session.type;
    
    try{

        const {reviewID, resturantID, responseTitle, responseContent} = req.body;

        
        const user = await User.findOne({username: req.session.username}).exec()
        const ownerID = user.userID;
        //const review = await Review.findOne({reviewID});
        const lastResponse = await Response.findOne().sort({responseID: -1});
        const newResponseID = lastResponse ? lastResponse.responseID + 1 : 1;

        const newResponse = new Response({
            responseID: newResponseID,  
            ownerID,
            reviewID,
            resturantID,
            responseTitle,
            responseContent
        });

        await newResponse.save();
        res.status(201).json({message: 'Response created successfully', response: newResponse});

    }catch(error){
        console.error(error);
    }

})





module.exports = router;
