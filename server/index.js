const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/auth', {
	useMongoClient: true,
});

const app = express();
const router = require('./router');

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const port = process.env.PORT || 4000;

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port', port);

// process.on('SIGUSR2', () => { server.close(); });
