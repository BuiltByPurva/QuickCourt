// routes/auth.routes.js
const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const validate = require('../middlewares/validate.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

// POST /login
router.post(
  '/login',
  validate.validateLogin,        // Validate email & password format
  authController.login
);

// POST /register
router.post(
  '/register',
  validate.validateRegister,     // Validate user input (email, password, name, etc.)
  authController.register
);

// POST /logout
router.post(
  '/logout',
  authMiddleware.verifyToken,    // Verify user is logged in (token check)
  authController.logout
);

// POST /forgot-password
router.post(
  '/forgot-password',
  validate.validateEmail,        // Validate email format
  authController.forgotPassword
);

// POST /reset-password
// router.post(
//   '/reset-password',
//   validate.validateResetPassword, // Validate token and new password
//   authController.resetPassword
// );

// POST /verify-signup-otp
router.post(
  '/verify-signup-otp', 
  authController.verifySignupOTP
);

module.exports = router;
