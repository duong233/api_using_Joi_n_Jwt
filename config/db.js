const { NOT_EXTENDED } = require('http-status');
const mongoose = require('mongoose');

function connect(){
    try{
        mongoose.connect(process.env.DB_CONNECTION);
        console.log('connected');
    }
    catch(err){
        console.log('connect fail');
    }
}
// const connect = mongoose.connect(
//     process.env.DB_CONNECTION,  
//     (err) => {
//     if(err) console.log(err);
//     else console.log('connected to db');
// // });

module.exports = {connect};