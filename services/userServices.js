const userModel = require('../models/userModel');

async function createUser(name, email, password, role) {
		return userModel.createUser(name, email, password, role);
}

module.exports = {
	createUser,
};
