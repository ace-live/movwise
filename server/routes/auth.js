const express = require('express');
const router = express.Router();
const { register, login, adminlogin, updateUserStatus } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/adminlogin', adminlogin);
router.post('/updateUserStatus', updateUserStatus);


module.exports = router;
