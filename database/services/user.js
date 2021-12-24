const User = require('../models/User');

create = async(data)=>{
    const createData = await User.create(data);
    return createData;
}


getDataByEmail = async(email)=>{
    const getData = await User.findOne({email:email});
    return getData;
}

module.exports = {
    create, 
    getDataByEmail
}