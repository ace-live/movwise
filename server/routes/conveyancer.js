const express = require('express');
const router = express.Router();
const conveyancerController = require('../controllers/admin/conveyancerController');


router.get('/', adminAuth, conveyancerController.getConveyancers);
router.get('/:id', adminAuth, conveyancerController.getConveyancerById);
router.patch('/:id/approve', adminAuth, conveyancerController.approveConveyancer);
router.patch('/:id/soft-delete', adminAuth, conveyancerController.softDeleteConveyancer);

module.exports = router;
