const mongoose = require('mongoose');
const config = require('../config/config');
const dbOptions = {
    maxPoolSize: 5,
  };

mongoose.connect(config.MONGO_URI, dbOptions, (err)=>{
    if(err){
        console.log('error connectiong to database'+err);
    }else{
        console.log('connected to mondodb');
    }
});

module.exports = mongoose;

