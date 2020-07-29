//importing/initialising packages
const express = require('express');
const cors=require('cors');
const nodemailer = require('nodemailer');
const mail = require('./controllers/mail');
const nodemailMailGun = require('nodemailer-mailgun-transport');

const app=express();
const PORT=process.env.PORT || 3001;

//middlewares
app.use(cors());
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