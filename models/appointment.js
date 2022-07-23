/*
; Author: Andrew (Andy) Britt
; Date: 20 July 2022
; File name: appointment.js
; Description: appointment.js file for week-8/ WEB-340
; Reference: https://github.com/buwebdev/web-340/tree/master/week-7
; Reference: https://github.com/buwebdev/web-340/tree/master/week-8
; Date referenced: 20 July 2022
*/

const mongoose = require('mongoose');
//const passportLocalMongoose = require('passport-local-mongoose');

const appointmentSchema = new mongoose.Schema({
    breed: { type: String },
    userName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    petName: { type: String },
    email: { type: String },
    service: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// appointmentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('appointment', appointmentSchema);