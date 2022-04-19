const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./config/db')
const nodemailer = require('nodemailer');

require('dotenv').config();

//connect db 
db.connect();

//Import routes
const userRoutes = require('./server/api/user/user.route');
const authRoutes = require('./server/api/auth/auth.route');
const {errorHandler} = require('./server/helpers/errorHandle');
const postRoute = require('./server/api/posts/post');

//middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(userRoutes);
app.use(authRoutes);
app.use(postRoute);

//error handle mdware
app.use(errorHandler);

app.listen(3000,()=>{
    console.log('running'); 
})