const express = require('express');
const router = express.Router();
const catchAsync = require('../util/catchAsync');
const users = require('../controllers/users');

router.route('/')
    .post(catchAsync(users.login));

router.route('/home')
    .get(users.renderHome);

module.exports = router;
