const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.createJwt = async(data)=>{
    let token = await jwt.sign(data,config.JWT_KEY);
    return token;
}

exports.decodeToken = async(token)=>{
    let data = await jwt.verify(token, config.JWT_KEY);
    return data;
}