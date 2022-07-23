/*
; Author: Professor Krasso
; Author: Andrew (Andy) Britt
; Date: 19 Jun 2022
; File name: index.js
; Description: index.js file for week-4/ WEB-340
; Reference: https://www.youtube.com/watch?v=A01KtJTv1oc&t=726s
; Reference: https://www.geeksforgeeks.org/how-to-setup-view-engine-in-node-js/
; Reference: https://github.com/buwebdev/web-340/tree/master/week-6
: Reference: https://github.com/buwebdev/web-340/tree/master/week-7
; Reference: https://github.com/buwebdev/web-340/tree/master/week-8
; Date referenced: 21 Jun 2022
*/

// requiring Express and declaring the port used
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');
const csrf = require("csurf");
const csurfProtection = csrf({ cookie: true });
const helmet = require('helmet');
const fs = require('fs');

// Model imports
const User = require('./models/user.js');
const Appointment = require('./models/appointment.js');
const appointment = require('./models/appointment.js');

// Mongo DB connectioon
const CONN = "mongodb+srv://admin:admin@buwebdev-cluster-1.ypoz2re.mongodb.net/testDB";

mongoose.connect(CONN).then(() => {
    console.log('Connection to the database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cookieParser());
app.use(csurfProtection);

// Helmet protection
app.use(helmet.xssFilter());

app.use(session({
    secret: 's3cret',
    resave: true,
    saveUninitialized: true,
}));

// csurf
app.use((req, res, next) => {
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    res.locals.csrfToken = token;
    next();
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Defining and using currentUser
app.use((req, res, next) => {
    if (req.session.passport) {
        console.log(req.session.passport.user);
        res.locals.currentUser = req.session.passport.user;
    } else {
        res.locals.currentUser = null;
    }
    next();
})

// Static files
app.use('/partials', express.static(__dirname + 'views/partials'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/js', express.static(__dirname + 'public/js'));

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

// Sending Registration Data
app.post('/register', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    User.register(new User({ username: username, email: email }), password, function (err, user) {
        if (err) {
            console.log(err);
            return res.redirect('/register');
        }

    passport.authenticate("local")(req, res, function () {
            res.redirect('/login')
        });
    });
});

// GETing Registration Data
app.get('/register', (req, res)=> 
{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    User.find({}, function (err, users) 
    {
        if (err)
        {
            console.log(err);

        } 
        else
        {
            res.render('register.html', 
            {
                cardTitle: 'Registration Form',
                moment: moment,
                users: users,
                csrfToken: req.csrfToken()
            });
        }
    });
});

// Login page
app.get('/login', (req, res)=> 
{
    res.render('login.html', { csrfToken: req.csrfToken() });
});

// Login and authenticate
app.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
    }), function (req, res) {
});

// Logout function
app.get("/logout", function (req, res, next) {
    req.logout(function (err) {
        if (err) 
        {
            return next(err);
        }
    res.redirect("/login");
    });
});

// Appointments page routes
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect("/");
    }
}

app.get("/appointment", isLoggedIn, (req, res, next) => {
    let servicesJsonFile = fs.readFileSync('./public/data/services.json');
    let services = JSON.parse(servicesJsonFile);
    
    res.render("appointment.html", {
        cardTitle: 'Appointment Form',
        services
    });
});

app.post("/appointment", isLoggedIn, (req, res, next) => {
    const breed = req.body.breed;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const petName = req.body.petName;
    const email = req.body.email;
    const service = req.body.service;

    let newAppointment = new Appointment({
        breed,
        firstName,
        lastName,
        petName,
        email,
        service
    });

    Appointment.create(newAppointment, (err, newAppointment) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index.html")
            console.log("New appointment created ")
        }
    })
    // res.render("appointment.html");
});

// Listen and Logging on port 3000
app.listen(PORT, ()=>
{
    console.log('The application is listening on ' + PORT);
});

