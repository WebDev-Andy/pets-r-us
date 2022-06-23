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
const PORT = 3000;

// Static files
app.use(express.static(__dirname + '/public'));
//app.use(express.static('views'));
//app.use('/images', express.static(__dirname + 'public/images'));
//app.use('/styles', express.static(__dirname + 'public/styles'));
//app.use('/styles/pets.css', express.static(__dirname + 'public/styles/pets.css'));
//app.use('/js', express.static(__dirname + 'public/js'));


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

// Listen on port 3000
app.listen(PORT, ()=>
{
    console.log('This application can smell your thoughts on port ' + PORT);
});

