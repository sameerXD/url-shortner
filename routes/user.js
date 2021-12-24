const express = require('express');
const router = express.Router();
const auth = require('../controller/auth');
const user = require('../controller/user');

router.route('/signUp').get(user.createSignUpLink_google);
router.route('/auth_callback').get(user.googleAuth_callback);

module.exports = router;
