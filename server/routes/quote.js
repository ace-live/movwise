const express = require('express');
const router = express.Router();
const authenticateToken = require('../controllers/middleware/authenticateToken');

const { submitQuote, getQuotesByUser, getQuoteDetails } = require('../controllers/quoteController');
router.post('/submitquote', submitQuote);
router.post('/getquotesbyuser', getQuotesByUser);
router.post('/getquotedetails', authenticateToken,getQuoteDetails);
module.exports = router;