//MAIN LIBRARIES
const express = require('express');
//END MAIN LIBRARIES

//APP LIBRARIES
const env = require('../config/env');
const routes = require('./routes/api');
//END APP LIBRARIES

const app = express();
app.use(express.json());

routes(app);

app.listen(env.port, () => { console.log(`Initialized server on port ${env.port}`) });