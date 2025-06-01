const express = require('express');
const router = express.Router();
const disputeController = require('../controllers/admin/disputeController');


router.get('/disputes', disputeController.getDisputes);
router.get('/disputes/:id', disputeController.getDisputeById);
router.post('/disputes', disputeController.createDispute);
router.patch('/disputes/:id/status', disputeController.updateDisputeStatus);
router.post('/disputes/:dispute_id/conversations', disputeController.addConversation);
router.get('/disputes/:dispute_id/conversations', disputeController.getDisputeConversations);
router.delete('/disputes/:id', disputeController.deleteDispute);

module.exports = router;