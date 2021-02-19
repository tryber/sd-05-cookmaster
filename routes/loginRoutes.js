const router = require('express').Router();
const userController = require('../controllers/userController');
const { validateLogin } = require('../middlewares/validator');

router.post('/', validateLogin, (req, res) => userController.login(req, res));

module.exports = router;
