const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/reviewController');

router.post('/createreview', createReview)
router.get('/getreview/:author_id', getReviews)

module.exports = router;
