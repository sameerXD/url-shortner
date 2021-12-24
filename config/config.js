require('dotenv').config();

let PORT=3000;
let BASE_URL=`http://localhost:${PORT}`;

module.exports = {
    PORT,
    BASE_URL,
    JWT_KEY:'MYKEY',
    MONGO_URI:process.env.MONGO_URI,
    GOOGLE_AUTH:{
        CLIENT_ID:process.env.GOOGLE_CLIENTID,
        CLIENT_SECRET:process.env.GOOGLE_SECRET,

        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        SCOPES: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
          ],
        REDIRECT_URIS: [
            `${BASE_URL}/user/auth_callback`
        ],
    }
}