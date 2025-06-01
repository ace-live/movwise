const express = require('express');
const router = express.Router();
const adminController  = require('../controllers/admin/usersController');

router.get('/users', adminController.getUsers); // Get all users
router.get('/users/:id', adminController.getUserById); // Get user by ID
router.patch('/users/:id/status', adminController.alterUserStatus); // Change user status
router.patch('/users/:id/roles', adminController.updateUserRoles); // Update user roles

module.exports = router;
