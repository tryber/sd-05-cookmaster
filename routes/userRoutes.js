const router = require('express').Router();
const userController = require('../controllers/userController');
const { newUserValidate } = require('../middlewares/validator');

router.post('/', newUserValidate, (req, res) => userController.createUser(req, res));

module.exports = router;
