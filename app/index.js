//MAIN LIBRARIES
const express = require('express');
require('dotenv').config()
//END MAIN LIBRARIES

//APP LIBRARIES
const env = require('../config/env');
const routes = require('./routes/api');
const cronManager = require('./utils/cron-setup');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');
//END APP LIBRARIES

const app = express();
app.use(express.json());
app.use(cors())
require('./utils/auth')

routes(app);
cronManager.recreateSchedules()

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(env.port, () => { console.log(`Initialized server on port ${env.port}`) });
