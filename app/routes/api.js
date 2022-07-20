const crons = require('../../modules/cron/routes');

const routes = server => {
    server.use('/crons', crons)
}

module.exports = routes;