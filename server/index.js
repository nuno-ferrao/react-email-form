//module that provides way of working with file paths and directories
const path = require('path');
const express = require('express');
const transporter = require('./config');

const dotenv = require('dotenv');
const { stringify } = require('querystring');
dotenv.config();

const port = 3030;
const app = express();



const buildPath = path.join(__dirname, '..', 'build');

//same as app.use(bodyParser.json()), this module has been integrated into express as built-in, therefore accomplishes the same
app.use(express.json());

//middleware that allows to use static files (css, js, png, jpeg, etc) from a given directory.
//we are telling express to serve all the files from the build folder which will be created when we run npm run build command. It will contain all our react code along with the index.html file.
app.use(express.static(buildPath));

app.post('/send', (req, res) => {
    const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            <li>Subject: ${req.body.subject}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;

    try {
        //set up email information
        const mailOptions = {            
            to: process.env.email, //list of receivers 
            subject: 'Contact request received',
            html:  output //html body
        };

        //sendMail nodemailer method for sending email
        transporter.sendMail(mailOptions, function(err, info) {
            if(err) {
                res.status(500).send({
                    success: false,
                    message: 'Something went wrong. Try again later'
                });
            } else {
                res.send({
                    success: true,
                    message: 'Thanks for contacting us. We will get back to you shortly'
                });
            } 
        });    
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Something went wrong. Try again later'
        });
    } 
});


app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})



