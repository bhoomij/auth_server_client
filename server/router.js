const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const authentication = require('./controllers/authentication');


module.exports = function (app) {
	app.get('/', requireAuth, (req, res) => {
		res.send('hello');
	});
	app.post('/signin', requireSignin, authentication.signin);
	app.post('/signup', authentication.signup);
};
