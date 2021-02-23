// regex https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
const { emailModel } = require('../model/UserModel');

const createUserService = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  const emailIsValid = (emailEnter) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(emailEnter).toLowerCase());
  };

  if (!emailIsValid(req.body.email)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  const emailUnique = await emailModel(email);
  if (emailUnique) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  next();
};

module.exports = createUserService;
