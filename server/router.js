const authentication = require('./controllers/authentication');
const passport = require('passport');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {
	app.get('/', requireAuth, (req, res) => {
		res.send({ message: 'Super secret is ABC123' });
	});
	app.post('/signin', requireSignin, authentication.signin);
	app.post('/signup', authentication.signup);
};
