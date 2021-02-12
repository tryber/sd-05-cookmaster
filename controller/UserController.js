const { Router } = require('express');
const rescue = require('express-rescue');
const service = require('../service/UserService');

const rota = Router();

user.post('/', rescue(async(req, res) => {
    const createNewUser = await service.create(req.body);
    return res.status(200).json({ user: createNewUser });
}));

module.exports = rota;