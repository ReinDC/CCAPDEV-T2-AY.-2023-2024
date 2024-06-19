//* =========Libraries=========
const express = require('express');
const server = express();
const bodyParser = require('body-parser')
const handlebars = require('express-handlebars');
const path = require('path');
const connectToMongo = require('./src/scripts/conn.js');
const populateDatabase = require('./src/scripts/populateDatabase.js');
//* ===========================



//* ==========Routers==========
const router = require('./src/routes/indexRouter.js');
//* ===========================

server.use(express.static(path.join(__dirname, 'public')));
server.set('view engine', 'hbs');
server.use(bodyParser.urlencoded({ extended: true }));
server.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    },
    helpers: {
        getUserUserame: function(userID, users) {
            const user = users.find(user => user.userID === userID);
            return user ? user.username : 'Unknown';
        },
        getUserProfilePic: function(userID, users) {
            const user = users.find(user => user.userID === userID);
            return user ? user.profpic : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png';
        }
    },
}));
server.use(router);

var port = process.env.PORT || 3000

// server.listen(port, function(){
//     console.log('Listening at port '+ port);
// });

async function startServer() {
    try {
        await connectToMongo();
        await populateDatabase();

        server.listen(port, function() {
            console.log('Server: Listening at port ' + port);
        });
    } catch (error) {
        console.error('Server: Failed to start server', error);
    }
}

startServer();