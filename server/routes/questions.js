 const express = require('express');
 const router = express.Router();

 const {getQuestionsByCategory} = require('../controllers/questionController');

 router.post('/getquestionbycategory', getQuestionsByCategory);

 module.exports = router;