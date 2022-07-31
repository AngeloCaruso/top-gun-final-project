//MAIN LIBRARIES
const express = require('express');
//END MAIN LIBRARIES

//APP LIBRARIES
const env = require('../config/env');
const routes = require('./routes/api');
const cronManager = require('./utils/cron-setup');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
//END APP LIBRARIES

const app = express();
app.use(express.json());
require('./utils/auth')

routes(app);
cronManager.recreateSchedules()

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(env.port, () => { console.log(`Initialized server on port ${env.port}`) });
