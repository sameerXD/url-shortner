const User = require('../models/User');

create = async(data)=>{
    const createData = await User.create(data);
    return createData;
}


getDataByEmail = async(email)=>{
    const getData = await User.findOne({email:email});
    return getData;
}

getDataByShortUrl = async(shortUrl)=>{
    const getData = await User.findOne({'data.shortUrl':shortUrl},{'_id':0, data:{$elemMatch:{shortUrl:shortUrl}}});
    return getData;
}

createShortUrl = async(data)=>{
    const updateData = await User.findOneAndUpdate({email:data.email}, {$push:{data:{orignalUrl:data.orignalUrl, shortUrl:data.shortUrl}}});
    return updateData;
}

updatUrlClick = async(urlId)=>{
   const updateData = await User.update({'data._id':urlId}, {$inc:{'data.$.count':1}});
   return updateData;
}

deleteShortUrl = async(data)=>{
    const delData = await User.findOneAndUpdate({email:data.email}, {$pull:{data:{_id:data.dataId}}});
    return delData;
}
module.exports = {
    create, 
    getDataByEmail,
    createShortUrl,
    getDataByShortUrl,
    updatUrlClick,
    deleteShortUrl
}