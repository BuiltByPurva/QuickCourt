const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const { verifyToken } = require('../middlewares/auth.middleware'); // JWT middleware

// GET all users (admin only)
router.get('/', verifyToken, usersController.getAllUsers);

// GET single user by ID
router.get('/:id', verifyToken, usersController.getUserById);

// UPDATE user profile
router.put('/:id', verifyToken, usersController.updateUser);

// DELETE user
router.delete('/:id', verifyToken, usersController.deleteUser);

module.exports = router;
