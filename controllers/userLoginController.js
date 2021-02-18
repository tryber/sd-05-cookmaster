const jwt = require('jsonwebtoken');
const { findEmail } = require('../models/createUser');

const secret = 'seusecretdetoken';

const userLoginController = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findEmail(email);
    delete user.name;
    delete user.password;
    console.log(user);

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: 'Erro interno', error: e });
  }
};

module.exports = userLoginController;
