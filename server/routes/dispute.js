const express = require('express');
const router = express.Router();
const disputeController = require('../controllers/admin/disputeController');
const authenticateToken = require('../controllers/middleware/authenticateToken');


router.get('/', authenticateToken, disputeController.getDisputes);
router.get('/:id', authenticateToken, disputeController.getDisputeById);
router.post('/', authenticateToken, disputeController.createDispute);
router.patch('/:id/status', authenticateToken, disputeController.updateDisputeStatus);
router.post('/:dispute_id/conversations', authenticateToken, disputeController.addConversation);
router.get('/:dispute_id/conversations', authenticateToken, disputeController.getDisputeConversations);
router.delete('/:id', authenticateToken, disputeController.deleteDispute);

module.exports = router;