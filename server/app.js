const express = require('express');
const app = express();
const config = require('./config.json');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/physher`, { useNewUrlParser: true });

const routers = {
	index: require('./routes/index.js'),
	auth: require('./routes/auth.js'),
	api: require('./routes/api.js'),
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({ 
	secret: 'keyboard cat',
	resave: true,
	saveUninitialized: false,
}));

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(passport.initialize());
app.use(passport.session());


app.use('/api', routers.api);
app.use('/auth', routers.auth);
app.use('/', routers.index);

app.listen(config.port, () => console.log(chalk.green(`running on port ${config.port}`)));