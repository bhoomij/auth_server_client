const passport = require('passport');

const authentication = require('./controllers/authentication');
const passportConfig = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
    app.get('/', requireAuth, (req, res) => {
        res.send('hello');
    });
    app.post('/signin', requireSignin, authentication.signin)
    app.post('/signup', authentication.signup)
}