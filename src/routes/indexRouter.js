const Router = require('express');
const bodyParser = require('body-parser');
const express = require('express');
const User = require('../models/users');
const Resturant = require('../models/resturants');
const Review = require('../models/reviews');

const router = Router();
router.use(express.json());

router.get("/", (req, res) => {
    res.render("login",{
        title: "Login",
    });
});

router.get("/login", (req, res) => {
    res.render("login",{
        title: "Login",
    });
});

router.get("/register", (req, res) => {
    res.render("register",{
        title: "Register",
    });
});

router.get("/logout", (req, res) => {
    res.render("logout",{
        title: "Logout",
    });
});

router.get("/view-establishment", async (req, res) => {
    try {
        const resturants = await Resturant.find().lean();
        res.render('view-establishment', 
            { 
                resturants: resturants // Format: (Name inside the {{#each}}): Name of the array in this function/file 
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/user-profile", (req, res) => {
    res.render("user-profile",{
        title: "User profile",
    });
});

router.get("/edit-profile", (req, res) => {
    res.render("edit-profile",{
        title: "Edit profile",
    });
});

router.get("/about-us-page", (req, res) => {
    res.render("about-us-page",{
        title: "About Us",
    });
});

router.get("/search-establishments", (req, res) => {
    res.render("search-establishment",{
        title: "Search establishments",
    });
});

router.get("/edit-review", (req, res) => {
    res.render("edit-review",{
        title: "Edit Review",
    });
});

router.get("/edit-details", async (req, res) => {
    

    try {
        const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';
        const resturantName = message;
        const resturant = await Resturant.findOne({ resturantName: resturantName });   
        res.render("edit-details",{
            title: "Edit details",
            message: message,
            chosenResturant: resturant
        });
    } catch (error) {
        
    }
});

router.get("/create-review", async (req, res) => {
    try {
        const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';
        const resturantName = message;
        const resturant = await Resturant.findOne({ resturantName: resturantName });   
        res.render("create-review",{
            title: "Create-review",
            message: message,
            chosenResturant: resturant
        });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/view-establishment-reviews", async (req, res) => {
    // res.render("view-establishment-reviews",{
    //     title: "View establishment reviews",
    //     message: message
    // });

    try {
        const message = req.query.message ? decodeURIComponent(req.query.message) : 'No message';   
        const resturantName = message;
        const resturant = await Resturant.findOne({ resturantName: resturantName });
        const reviews = await Review.find({ resturantID: resturant.resturantID });

        const reviewerIDs = reviews.map(review => review.reviewerID);
        const users = await User.find({ userID:{ $in: reviewerIDs } });
        const chosenResturant = resturant;


        // const test = reviews.map(review => review.reviewContent);
        // console.log(test);

        res.render('view-establishment-reviews', 
            { 
                title: "View establishment reviews",
                reviews: reviews, // Format: (Name inside the {{#each}}): Name of the array in this function/file
                message: message, // For the name of the resturant
                users: users,
                chosenResturant: chosenResturant
            });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/get-image", async (req, res) =>{
    try{
        const resturantName = req.body.resturant;
        const resturant = await Resturant.findOne({ resturantName: resturantName });


        if (resturant) {
            res.status(200) // .json({ imgLink: resturant.resturantIMG });
            res.send({ imgLink: resturant.resturantIMG})
        } 
        else {
            res.status(404)
            console.log("\nNot Found");
            console.log(resturantName);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }

})

//* How to get all the data from a collection
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find().select('-_id'); // .select('-_id') excludes the "_id" field
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


// Route to handle form submission
router.post('/submit-form-login', async (req, res) => {
    try{
        const username = req.body.username;
        const password = req.body.password;

        const user = await User.findOne({ username: username, password: password });


        if (user) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(404).json({ message: 'User not found' });
            
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred', error: error.message });
    }
});

module.exports = router;