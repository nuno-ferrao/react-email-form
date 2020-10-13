const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

//function call that fetches environment variables
dotenv.config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.email, //email address stored in .env file
        pass: process.env.password //password stored in .env file
    }
});


module.exports = transporter;
