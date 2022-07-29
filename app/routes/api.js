const crons = require('../../modules/cron/routes');
const cronLog = require('../../modules/cronLog/routes');

const routes = server => {
    server.use('/crons', crons);
    server.use('/cron-logs', cronLog);
}

module.exports = routes;