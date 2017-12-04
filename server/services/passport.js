const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const config = require('../config');

const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret,
};

const jwtLogin = new JwtStrategy(jwtOptions, ((payload, done) => {
	User.findById(payload.sub, (err, user) => {
		if (err) { return done(err, false); }

		if (user) {
			return done(null, user);
		}
		return done(null, false);
	});
}));

const localOptions = {
	usernameField: 'email',
	passwordField: 'password',
};

const localLogin = new LocalStrategy(localOptions, ((email, password, done) => {
	console.log('here11');
	User.findOne({ email }, (err, user) => {
		if (err) { return done(err); }

		if (!user) {
			return done(null, false);
		}

		user.comparePassword(password, (err, isMatch) => {
			if (err) { return done(err); }
			if (!isMatch) { return done(null, false); }

			return done(null, user);
		});
	});
}));

passport.use(jwtLogin);
passport.use(localLogin);
