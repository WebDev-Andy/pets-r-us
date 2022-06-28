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
const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static("public"));
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

// Listen and Logging on port 3000
app.listen(PORT, ()=>
{
    console.log('The application is listening on ' + PORT);
});
