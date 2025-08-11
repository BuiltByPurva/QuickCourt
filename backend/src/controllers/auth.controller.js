// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { User } = require('../models');

// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, phone, role } = req.body;

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       role
//     });

//     res.status(201).json({ message: 'User registered successfully', user: newUser });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.json({ message: 'Login successful', token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
// controllers/auth.controller.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User, OTP } = require('../models');
const { generateOTP } = require('../utils/otp');
const { sendEmail } = require('../utils/email');
const { Op } = require('sequelize');


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ where: { email } });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

//     // Create JWT token
//     const token = jwt.sign({ userId: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     res.json({ token, user: { id: user.user_id, name: user.name, email: user.email, role: user.role } });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, phone, role } = req.body;

//     // Check if user already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email already registered' });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       phone,
//       role: role || 'user'  // default to 'user' if not provided
//     });

//     // Optionally create JWT token on registration
//     const token = jwt.sign({ userId: newUser.user_id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

//     // Return response
//     res.status(201).json({
//       message: 'User registered successfully',
//       user: {
//         id: newUser.user_id,
//         name: newUser.name,
//         email: newUser.email,
//         role: newUser.role,
//       },
//       token
//     });
//   } catch (error) {
//     console.error('Register error:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    // Create JWT token
    const token = jwt.sign(
      { userId: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS in production
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ 
      message: 'Login successful',
      user: { id: user.user_id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create inactive user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: role || 'user',
      is_active: false,  // inactive until OTP verified
    });

    // Generate OTP & expiry
    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP
    await OTP.create({
      email,
      otp_code: otpCode,
      expires_at: expiresAt,
      used: false,
    });

    // Send OTP email
    await sendEmail(email, 'Verify your email', `Your signup OTP is: ${otpCode}`);

    res.status(201).json({ message: 'User registered. Please verify OTP sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.verifySignupOTP = async (req, res) => {
  try {
    const { email, otp_code } = req.body;

    const otpEntry = await OTP.findOne({
      where: { email, otp_code, used: false, expires_at: { [Op.gt]: new Date() } },
    });

    if (!otpEntry) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Activate user
    await User.update({ is_active: true }, { where: { email } });

    // Mark OTP used
    otpEntry.used = true;
    await otpEntry.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otpCode = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await OTP.create({
      email,
      otp_code: otpCode,
      expires_at: expiresAt,
      used: false,
    });

    await sendEmail(email, 'Password Reset OTP', `Your password reset OTP is: ${otpCode}`);

    res.json({ message: 'OTP sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


// exports.resetPassword = async (req, res) => {
//   try {
//     const { email, otp_code, new_password } = req.body;

//     const otpEntry = await OTP.findOne({
//       where: { email, otp_code, used: false, expires_at: { [Op.gt]: new Date() } },
//     });

//     if (!otpEntry) {
//       return res.status(400).json({ message: 'Invalid or expired OTP' });
//     }

//     const hashedPassword = await bcrypt.hash(new_password, 10);

//     await User.update({ password: hashedPassword }, { where: { email } });

//     otpEntry.used = true;
//     await otpEntry.save();

//     res.json({ message: 'Password reset successful' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };



// Temporary in-memory blacklist (use Redis or DB in production)
exports.logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });
  res.status(200).json({ message: 'Logged out successfully' });
};


// exports.forgotPassword = (req, res) => {
//   res.status(501).json({ message: 'Not implemented' });
// };

// exports.resetPassword = (req, res) => {
//   res.status(501).json({ message: 'Not implemented' });
// };

