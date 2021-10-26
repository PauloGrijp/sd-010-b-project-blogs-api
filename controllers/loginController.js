const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validLogin } = require('../middlewares/userMiddleware');

const secret = process.env.JWT_SECRET;

module.exports = async (req, res) => {
  const message = validLogin(req.body);
  if (message) return res.status(400).json({ message });
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.password !== req.body.password) {
      return res.status(400).json({ message: 'Invalid fields' }); 
    }
    const jwtConfig = {
      expiresIn: '2h',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
