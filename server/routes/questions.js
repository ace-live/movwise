 const express = require('express');
 const router = express.Router();

 const {getQuestionsByCategory, getCategories} = require('../controllers/questionController');

 router.post('/getquestionbycategory', getQuestionsByCategory);
 router.get('/getcategories', getCategories);

 module.exports = router;