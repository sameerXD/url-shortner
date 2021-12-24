const config = require('../config/config');
const googleAuth = require('../thirdParty/googleAuth');
const User = require('../database/services/user');
const cookieParser = require('cookie-parser');
const jwt = require('../utils/jwt');

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
              console.log(googleUser);

              //create jwt of the data that came from google
              let jwt_token = await jwt.createJwt({email:googleUser.email, name:googleUser.name, profilePicture:googleUser.picture});

              console.log(jwt_token);
            //   creating cookie of that token 
              res.cookie('jwt', jwt_token);

              let getUser = await User.getDataByEmail(isToken.payload.email);


            // used to find if user want to sign up or sign in 

              if(getUser){
                res.render('dashboard',{user:getUser});
              }else{
                  let data = {
                      email:googleUser.email,
                      firstName:googleUser.given_name,
                      lastName:googleUser.family_name,
                      emailAuth:googleUser.email_verified,
                      profilePicture:googleUser.picture,
                  }
                 let createData = await User.create(data);

                res.render('dashboard',{user:createData});

              }


            }
         
    } catch (err) {
        next(err);
    }
}
