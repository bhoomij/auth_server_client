const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
	return jwt.encode({ sub: user.id, iat: new Date().getTime() }, config.secret);
}

exports.signup = function (req, res, next) {
	let { email, password } = req.body;
	email = email.trim();
	password = password.trim();
	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' });
	}
	User.findOne({ email }, (err, user) => {
		if (err) { return next(err); }

		if (user) {
			return res.status(422).send({ error: 'Email is in use' });
		}

		User.create(req.body, (err, user) => {
			if (err) { return next(err); }
			res.json({ token: tokenForUser(user) });
		});
	});
};

exports.signin = function (req, res) {
	res.json({ token: tokenForUser(req.user) });
};
