const googleAuth = require('../thirdParty/googleAuth');
const config = require('../config/config');
const jwt = require('../utils/jwt');

exports.isValidGoogleUser = async(req,res,next)=>{
    try{
      let jwtToken = req.cookies.jwt;
      req.user = await jwt.decodeToken(jwtToken);
      next();
    }catch(err){
        return res.json({success:false, err:'jwt failed'});
    }
}
