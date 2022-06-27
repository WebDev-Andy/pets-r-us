/*
; Author: Andrew (Andy) Britt
; Date: 19 Jun 2022
; File name: index.js
; Description: index.js file for week-4/ WEB-340
; Reference: https://www.youtube.com/watch?v=A01KtJTv1oc&t=726s
; Reference: https://www.geeksforgeeks.org/how-to-setup-view-engine-in-node-js/
; Date referenced: 19 Jun 2022
*/

// Imports
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('views'));
//app.use('/images', express.static(__dirname + 'public/images'));
//app.use('/styles', express.static(__dirname + 'public/styles'));
//app.use('/js', express.static(__dirname + 'public/js'));

// Adding EJS to the apps view engine
app.engine('.html', require('ejs').__express);

// Setting views to HTML files directory
app.set('views', path.join(__dirname, 'views'));

// Setting view engine to HTML
app.set('view engine', 'html');

// Sending Index HTML
app.get('/', (req, res)=> 
{
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

// Sending Grooming page
app.get('/grooming', (req, res)=> 
{
    res.sendFile(path.join(__dirname + '/views/grooming.html'));
});

// Hello, is it me you're looking for? 404
app.get('/', (req, res)=> 
{
    res.sendFile(path.join(__dirname + '/views/grooming.html'));
});

// Listen on port 3000
app.listen(PORT, ()=>
{
    console.log('This application is listening on ' + PORT);
});

