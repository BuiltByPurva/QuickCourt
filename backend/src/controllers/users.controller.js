const { User } = require('../models');

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// UPDATE user profile
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const [updated] = await User.update(
      { name, email },
      { where: { id: req.params.id } }
    );

    if (!updated) return res.status(404).json({ message: 'User not found' });

    const updatedUser = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE user
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
