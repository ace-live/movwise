const express = require('express');
const router = express.Router();
const adminController  = require('../controllers/admin/usersController');

router.get('/', adminController.getUsers); // Get all users
router.get('/:id', adminController.getUserById); // Get user by ID
router.patch('/:id/status', adminController.alterUserStatus); // Change user status
router.patch('/:id/roles', adminController.updateUserRoles); // Update user roles
router.put('/:id', adminController.updateUser); // Update user details

module.exports = router;
