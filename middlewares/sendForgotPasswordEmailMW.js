const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

require('dotenv').config();



const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port: 465,
    secure:true,
    auth:{
        user: process.env.SUPPORT_EMAIL,
        pass: process.env.SUPPORT_PASSWORD
    }
});

module.exports = (objRepo) => {
    return(req,res,next) => {
        const {Email} = req.body;

        const host = req.get('host');
        console.log(host);

        const resetToken = req.resetToken;

        const resetLink = `http://${host}/reset-password/${resetToken}`;

        const mailOptions = {
            from: process.env.SUPPORT_EMAIL,
            to: Email,
            subject: 'Password Reset Request',
            text: 'You forgot your password here is your email:' + resetLink
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                return res.status(500).send("Failed to send the email.");
            }
            console.log("Email sent: " + info.response);
            return res.redirect('/');
        });

    }
}