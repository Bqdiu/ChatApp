const express = require('express');
const registerUser = require('../controllers/registerUser');
const checkEmail = require('../controllers/checkEmail');
const checkPassword = require('../controllers/checkPassword');
const userDetail = require('../controllers/userDetail');
const logout = require('../controllers/logout');
const updateUserDetail = require('../controllers/updateUserDetail');
const searchUser = require('../controllers/searchUser');
const router = express.Router();

// create user api
router.post('/register', registerUser);
// check user email
router.post('/email', checkEmail);
// check user password 
router.post('/password', checkPassword);
// login user detail
router.get('/user-detail', userDetail);
// logout user
router.get('/logout', logout);
// update user detail
router.post('/update-user-detail', updateUserDetail);
// search user
router.post('/search-user', searchUser);

module.exports = router; 
