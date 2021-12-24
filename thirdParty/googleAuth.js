const res = require('express/lib/response');
const {OAuth2Client} = require('google-auth-library');
const config = require('../config/config');

// USE URI[0] FOR LOCAL DEPLOYMENT AND URI[1] FOR HEROKU SO THAT CALLBACK URL CAN BE CHANGED
const client = new OAuth2Client(config.GOOGLE_AUTH.CLIENT_ID,config.GOOGLE_AUTH.CLIENT_SECRET,config.GOOGLE_AUTH.REDIRECT_URIS[1] );

const createUrl = ()=>{
    return client.generateAuthUrl({
    access_type:'offline',
    scope:config.GOOGLE_AUTH.SCOPES
});
}

const getToken = async(code)=>{
   const token = await client.getToken(code);
   return token.tokens.id_token;
}
const verifyIdToken = async(idToken)=>{
    try {
        const verifyToken = await client.verifyIdToken({idToken, audience:config.GOOGLE_AUTH.CLIENT_ID});
        return verifyToken;
    } catch (err) {
        return err;
    }
}
module.exports = {createUrl, verifyIdToken, getToken}