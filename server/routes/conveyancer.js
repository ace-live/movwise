const express = require('express');
const router = express.Router();
const conveyancerController = require('../controllers/admin/conveyancerController');
const authenticateToken = require('../controllers/middleware/authenticateToken');


router.get('/', authenticateToken, conveyancerController.getConveyancers);
router.get('/:id', authenticateToken.conveyancerController.getConveyancerById);
router.patch('/:id/approve', authenticateToken, conveyancerController.approveConveyancer);
router.patch('/:id/soft-delete', authenticateToken, conveyancerController.softDeleteConveyancer);
router.patch('/:id/status', authenticateToken, conveyancerController.alterConveyancerStatus);

module.exports = router;
