/*
; 
; 
; 
; 
; 
*/

const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res)=> 
{
    res.send('Sup dude?');
});

app.listen(PORT, ()=>
{
    console.log('Application is listen to you on port' + PORT);
});

