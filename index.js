/*
; Author: Andrew (Andy) Britt
; Date: 19 Jun 2022
; File name: index.js
; Description: index.js file for week-4/ WEB-340
; Reference: https://www.youtube.com/watch?v=A01KtJTv1oc&t=726s
; Reference: https://www.geeksforgeeks.org/how-to-setup-view-engine-in-node-js/
; Date referenced: 19 Jun 2022
*/

//requiring Express and declaring the port used
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const moment = require('moment');
const app = express();
const PORT = process.env.PORT || 3000;

// variable for database
const CONN = "db stuff goes here"

// connecting to the database
mongoose.connect(CONN).then(() => {
    console.log('Connection to the database was successful\n   You are not a failure!');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

// mongoose model imports
const User = require('./models/user.js');

// Static files
app.use(express.static("public"));
app.use('/partials', express.static(__dirname + 'views/partials'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/js', express.static(__dirname + 'public/js'));

// Week 6 addition - 
// need to accept forms
app.use(express.urlencoded({ extended: false })); 
// needed to parse delicious cookies
app.use(cookieParser());
// needed to accept and return JSON objects
app.use(express.json());
// Express session ?secret?
app.use(session({
    secret: 's3cret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Adding and setting EJS to the apps view engine
app.engine('.html', require('ejs').__express);
app.set('views', './views');
app.set('view engine', 'ejs');

// Sending Index HTML 
app.get('', (req, res)=>
{
    res.render('index.html');
});

// Sending Grooming page
app.get('/grooming', (req, res)=> 
{
    res.render('grooming.html');
});

// Sending Training page
app.get('/training', (req, res)=> 
{
    res.render('training.html');
});

// Sending Boarding page
app.get('/boarding', (req, res)=> 
{
    res.render('boarding.html');
});

// Getting Registration page
app.get('/register', (req, res) => {
    User.find({}, function(err, users) {
        if (err) {
            console.log(err);
        } else {
            res.render('register.html', {
                title: 'FMS: Register',
                message: message,
                cardTitle: 'Registration Form',
                moment: moment,
                users: users
            })
        }
    })
})

// Sending Registration Data
app.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.register(new User({username: username}), password, function(err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }

        passport.authenticate("local")(
            req, res, function () {
                res.redirect('/register')
            });
    })
})

// Sending Login page
app.get('/login', (req, res)=> 
{
    res.render('login.html');
});

// Getting Login Data
app.post('/login', (req, res) => {
    req.body.email
});

// Listen and Logging on port 3000
app.listen(PORT, ()=>
{
    console.log('The application is listening on ' + PORT);
});

