const config = require('../config/config');
const googleAuth = require('../thirdParty/googleAuth');
const User = require('../database/services/user');
const cookieParser = require('cookie-parser');
const jwt = require('../utils/jwt');
const { nanoid } = require('nanoid');

exports.createSignUpLink_google = async(req,res,next)=>{
    try {
        const url = googleAuth.createUrl();
        return res.render('signUp', {loginLink:url});
    } catch (err) {
        res.json({success:false,error:err })
    }
}


exports.googleAuth_callback= async(req,res,next)=>{
    try {
        if (req.query.error) {
            // The user did not give us permission.
            return res.redirect('/user/signUp');
          } else {
              
              let token = await googleAuth.getToken(req.query.code);
              if(!token) return res.json({success:false, err:'google auth token failed'});

              let isToken = await googleAuth.verifyIdToken(token);

            //   console.log(isToken);

              let googleUser = isToken.payload;
              // console.log(googleUser);

              //create jwt of the data that came from google
              let jwt_token = await jwt.createJwt({email:googleUser.email, name:googleUser.name, profilePicture:googleUser.picture});

              // console.log(jwt_token);
            //   creating cookie of that token 
              res.cookie('jwt', jwt_token);

              let getUser = await User.getDataByEmail(isToken.payload.email);


            // used to find if user want to sign up or sign in 

              if(getUser){
                res.redirect('/user/dashboard');
              }else{
                  let data = {
                      email:googleUser.email,
                      firstName:googleUser.given_name,
                      lastName:googleUser.family_name,
                      emailAuth:googleUser.email_verified,
                      profilePicture:googleUser.picture,
                  }
                 let createData = await User.create(data);

                 res.redirect('/user/dashboard');

              }


            }
         
    } catch (err) {
        next(err);
    }
}

exports.dashboard = async(req,res,next)=>{
  try{
    let getUser = await User.getDataByEmail(req.user.email);
    // console.log(getUser);
    res.render('dashboard', {user:getUser});
  }catch(err){
    next(err);
  }
}

exports.createShortUrl = async(req,res,next)=>{
  try{
     let orignal_url = req.body.url;
     let shortUrl = nanoid();

     let data = {
      orignalUrl:orignal_url,
      shortUrl:shortUrl,
      email:req.user.email
     }

     let updateData = await User.createShortUrl(data);

     res.redirect('/user/dashboard');


  }catch(err){
    next(err);
  }
}

exports.getShortUrl = async(req,res,next)=>{
  try{
    console.log(req.params.shortUrl);
    let getData = await User.getDataByShortUrl(req.params.shortUrl);

    if(!getData) return res.redirect('/user/dashboard');

    await User.updatUrlClick(getData.data[0]._id);
    res.redirect(getData.data[0].orignalUrl);
  }catch(err){
    next(err);
  }
}

exports.delShortUrl = async(req,res,next)=>{
  try{
    console.log(req.params.shortUrlId);
    let delData = await User.deleteShortUrl({dataId:req.params.shortUrlId,email:req.user.email});
    // console.log(delData);
    res.redirect('/user/dashboard');
  }catch(err){
    next(err);
  }
}

exports.logOut = async(req,res,next)=>{
  try{
    res.cookie('jwt','');
    res.redirect('/user/signUp');
  }catch(err){
    next(err);
  }
}