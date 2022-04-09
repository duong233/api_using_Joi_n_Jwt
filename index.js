const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

//connect db 
mongoose.connect(
    process.env.DB_CONNECTION, 
    {useNewUrlParser: true}, 
    () => console.log('connected to db')
);

//Import routes
const authRoutes = require('./routes/auth');

//Middleware
app.use(express.json());

//route mdware
app.use('/api/user', authRoutes);

app.listen(3000,()=>{
    console.log('running'); 
})