const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth:{
        user: process.env.NODE_USER,
        pass: process.env.NODE_PASS
    },
    tls:{
        rejectUnauthorized: false
    }
});

module.exports = transporter;