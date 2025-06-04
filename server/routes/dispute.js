const express = require('express');
const router = express.Router();
const disputeController = require('../controllers/admin/disputeController');


router.get('/', disputeController.getDisputes);
router.get('/:id', disputeController.getDisputeById);
router.post('/', disputeController.createDispute);
router.patch('/:id/status', disputeController.updateDisputeStatus);
router.post('/:dispute_id/conversations', disputeController.addConversation);
router.get('/:dispute_id/conversations', disputeController.getDisputeConversations);
router.delete('/:id', disputeController.deleteDispute);

module.exports = router;