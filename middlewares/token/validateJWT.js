const jwt = require('jsonwebtoken');
require('dotenv').config();

const { User } = require('../../models');

const senha = process.env.JWT_SECRET;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, senha);
  
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    req.user = user;
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }

  next();
};