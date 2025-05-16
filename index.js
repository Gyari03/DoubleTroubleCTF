const express = require('express');
const app = express();
const session = require("express-session");
const createDefaultAdmin = require('./createAdmin');  // Import the function
const createDefaultArticles = require('./createDefaultArticles');

require('dotenv').config();



app.use(express.static('static', {
    dotfiles: 'allow',
}));

app.use(session({
    secret:process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie:{
        secure: false,
        maxAge: 3200000,
    }
}));

app.use(express.json());

const initApp = async () => {
    await subscribeToRoutes(app);
    await connectDB();
    await createDefaultAdmin();
    await createDefaultArticles();

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
};


app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const subscribeToRoutes = require('./routing/routes.js');
const {connectDB} = require('./config/db');
const UserModel = require("./models/user");

app.use(express.static('static'));

const PORT = process.env.PORT;

initApp();