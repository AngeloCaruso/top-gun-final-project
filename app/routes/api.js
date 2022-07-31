const express = require('express');
const crons = require('../../modules/cron/routes');
const cronLog = require('../../modules/cronLog/routes');
const users = require('../../modules/users/routes');
const auth = require('../../modules/auth/routes');

const routes = server => {
    const router = express.Router();
    server.use('/api/v1', router);
    router.use('/crons', crons);
    router.use('/cron-logs', cronLog);
    router.use('/users', users);
    router.use('/auth', auth);
}

module.exports = routes;
