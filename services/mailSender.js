const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = mailSender = (toEmail, content, subject) => {
    console.log(process.env.EMAIL_ID, 'email id');

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_ID,
        to: toEmail,
        subject: subject,
        html: content,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent!');
        }
    });
};
