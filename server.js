//* =========Libraries=========
const express = require('express'); // Import Express library
const server = express(); // Create an Express application instance
const bodyParser = require('body-parser'); // Import body-parser for parsing request bodies
const handlebars = require('express-handlebars'); // Import express-handlebars for templating
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path'); // Import path module for handling file paths
const connectToMongo = require('./src/scripts/conn.js'); // Import function to connect to MongoDB
const populateDatabase = require('./src/scripts/populateDatabase.js'); // Import function to populate database
require('dotenv').config(); 
//* ===========================


//* ==========Routers==========
const router = require('./src/routes/indexRouter.js'); // Import the main router
//* ===========================

server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({ extended: true }));

server.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: { secure: false, maxAge: 3600000}
  }));

// Configure Handlebars engine with custom helpers
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        // Helper function to get username by userID
        getUserUserame: function(userID, users) {
            const user = users.find(user => user.userID === userID);
            return user ? user.username : 'Unknown';
        },
        // Helper function to get profile picture by userID
        getUserProfilePic: function(userID, users) {
            const user = users.find(user => user.userID === userID);
            return user ? user.profpic : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';
        },
        ifEquals: function(arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        },
        ifNullOrUndefined: function(value, options) {
            if (value === null || value === undefined) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
    },
}));

// Use the imported router for handling routes
server.use(router);

var port = process.env.PORT || 3000;

async function database() {
    try {
        await connectToMongo();
        await populateDatabase();
    } catch (error) {
        console.error('Server: Failed to start server', error);
    }
}

server.listen(port, async function() {
    await database();
    console.log(`Server: Running on http://localhost:${port}`);
});
