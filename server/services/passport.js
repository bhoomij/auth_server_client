const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
    User.findById(payload.sub, function (err, user) {
        if (err) { return done(err, false); }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })
});

const localOptions = {
    usernameField: 'email'
};

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
    User.findOne({ email }, function (err, user) {
        if (err) { return done(err); }

        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, function (err, isMatch) {
            if (err) { return done(err); }
            if (!isMatch) { return done(null, false); }

            return done(null, user);
        });
    })
});

passport.use(jwtLogin);
passport.use(localLogin);