const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
require('dotenv').config()

const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', __dirname+'/public/views');

const config = require('./config/config');
const mongoose= require('./database/db');


app.use('/user', require('./routes/user'));



app.listen(process.env.PORT || config.PORT, ()=>{console.log('server live '+ config.BASE_URL)});