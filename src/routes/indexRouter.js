const Router = require('express');
const User = require('../models/users');
const Resturant = require('../models/resturants');
const Review = require('../models/reviews');

const router = Router();

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
                resturants: resturants 
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


//* How to get all the data from a collection
// router.get('/users', async (req, res) => {
//     try {
//         const users = await User.find().select('-_id'); // .select('-_id') excludes the "_id" field
//         res.json(users);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });


module.exports = router;