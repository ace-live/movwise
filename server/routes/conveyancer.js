const express = require('express');
const router = express.Router();
const conveyancerController = require('../controllers/admin/conveyancerController');


router.get('/', conveyancerController.getConveyancers);
router.get('/:id', conveyancerController.getConveyancerById);
router.patch('/:id/approve', conveyancerController.approveConveyancer);
router.patch('/:id/soft-delete', conveyancerController.softDeleteConveyancer);

module.exports = router;
