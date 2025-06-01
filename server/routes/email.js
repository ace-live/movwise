const express = require('express');
const router = express.Router();
const { sendemail, sendotpemail } = require('../controllers/emailController');

router.post('/sendemail', sendemail);
router.post('/sendotpemail', sendotpemail);


module.exports = router;
