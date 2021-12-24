let PORT=3000;
let BASE_URL=`http://localhost:${PORT}`;
module.exports = {
    PORT,
    BASE_URL,
    JWT_KEY:'MYKEY',
    GOOGLE_AUTH:{
        CLIENT_ID:'942599632093-j6e88voo3v2rrjvp1uoq8d1tiuoo4l97.apps.googleusercontent.com',
        CLIENT_SECRET:'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',
        SCOPES: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile'
          ]
    }
}