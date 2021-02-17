const getConnection = require('./connection');

async function createUser(name, email, password, role) {
	const test = await getConnection('users').then((db) => {
		console.log('chegou aqui');

		db.find();
	});
	return test;
}

module.exports = {
	createUser,
};
