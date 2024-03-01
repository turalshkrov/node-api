const User = require('../models/user');

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id.length !== 24) return res.status(400).json({ message: 'Invalid id value' });
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ message: 'User not found' });
    res.user = user;
  } catch (error) {
    return res.status(500).json(error);
  }
  next();
}

module.exports = getUserById;