const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');
const user = require('../controller/user');

router.route('/signUp').get(user.createSignUpLink_google);
router.route('/auth_callback').get(user.googleAuth_callback);
router.route('/dashboard').get(auth.isValidGoogleUser, user.dashboard);
router.route('/createShortUrl').post(auth.isValidGoogleUser, user.createShortUrl);
router.route('/getShortUrl/:shortUrl').get(auth.isValidGoogleUser, user.getShortUrl);
router.route('/delShortUrl/:shortUrlId').get(auth.isValidGoogleUser, user.delShortUrl);
router.route('/logOut').get(auth.isValidGoogleUser, user.logOut);

module.exports = router;
