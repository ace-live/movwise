const express = require('express');
const router = express.Router();
const adminController  = require('../controllers/admin/usersController');
const authenticateToken = require('../controllers/middleware/authenticateToken');

router.get('/',authenticateToken, adminController.getUsers); // Get all users
router.get('/:id', authenticateToken,adminController.getUserById); // Get user by ID
router.patch('/:id/status', authenticateToken,adminController.alterUserStatus); // Change user status
router.patch('/:id/roles', authenticateToken,adminController.updateUserRoles); // Update user roles
router.put('/:id', authenticateToken,adminController.updateUser); // Update user details

module.exports = router;
