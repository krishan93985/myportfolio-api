//importing/initialising packages
//require('dotenv').config();
const express = require('express');
const cors=require('cors');
const nodemailer = require('nodemailer');
const mail = require('./controllers/mail');
const nodemailMailGun = require('nodemailer-mailgun-transport');

const app=express();
const PORT=process.env.PORT || 3001;

var whitelist = ['http://localhost:3001','http://localhost:3000', 'https://krishan93985.github.io'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//middlewares
app.use(cors(corsOptions));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//get Route
app.get('/',(req,res) => {
    console.log('working');
    res.json('It\'s working');
})

//Mailing Route
app.post('/contact',(req,res) => mail.sendMail(req,res,nodemailer,nodemailMailGun));

//Listring to port
app.listen( PORT , () => console.log(`App is running at ${PORT}`));