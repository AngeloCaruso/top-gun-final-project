//MAIN LIBRARIES
const express = require('express');
//END MAIN LIBRARIES

//APP LIBRARIES
const env = require('../config/env');
const routes = require('./routes/api');
const cronManager = require('./utils/cron-setup');
//END APP LIBRARIES

const app = express();
app.use(express.json());

routes(app);
cronManager.recreateSchedules()


app.listen(env.port, () => { console.log(`Initialized server on port ${env.port}`) });
