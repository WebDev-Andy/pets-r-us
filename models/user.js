/*
; Author: Andrew (Andy) Britt
; Date: 14 July 2022
; File name: user.js
; Description: user.js file for week-6/ WEB-340
; Reference: https://github.com/buwebdev/web-340/tree/master/week-6
; Date referenced: 15 July 2022
*/

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    email: { type: String },
    password: { type: String}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);