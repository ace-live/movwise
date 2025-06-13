const express = require('express');
const router = express.Router();

const { submitQuote, getQuotesByUser, getQuoteDetails } = require('../controllers/quoteController');
router.post('/submitquote', submitQuote);
router.post('/getquotesbyuser', getQuotesByUser);
router.post('/getquotedetails', getQuoteDetails);
module.exports = router;