const Router = require('express');
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

router.get("/view-establishment", (req, res) => {
    res.render("view-establishment",{
        title: "View establishments",
    });
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


module.exports = router;