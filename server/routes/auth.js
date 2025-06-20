const express = require('express');
const router = express.Router();
const { register, login, adminlogin, updateUserStatus, verifyOtpStatus, getUserData } = require('../controllers/authController');
const authenticateToken = require('../controllers/middleware/authenticateToken');

router.post('/register', register);
router.post('/login', login);
router.post('/adminlogin', adminlogin);
router.post('/updateuserstatus', updateUserStatus);
router.post('/verifyotp', verifyOtpStatus)
router.post('/getuserdata', authenticateToken, getUserData); // Get user data


module.exports = router;
