const express = require('express');
const app = express();
const config = require('./config.json');
const chalk = require('chalk');

const routers = {
	index: require('./routes/index.js'),
	api: require('./routes/api.js'),
}

app.use('/api', routers.api);
app.use('/', routers.index);

app.listen(config.port, () => console.log(chalk.green(`running on port ${config.port}`)));