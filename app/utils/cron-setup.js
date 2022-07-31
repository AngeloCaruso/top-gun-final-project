const cron = require('node-schedule');
const cronService = require('../../modules/cron/services');
const cronLogService = require('../../modules/cronLog/services');
const https = require('https');

exports.create = (id, schedule, url) => {
    cron.scheduleJob(id, schedule, () => {
        console.group('Cron execution')
        console.log(`Executing job ${id}`);
        console.log(`Sending a request to: ${url} on ${schedule}`);

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                responseData =  data.toString();
                cronLogService.store({
                    cron_id: id,
                    response_log: JSON.stringify(responseData)
                });
                console.log('Job succeeded!');
                console.groupEnd('Cron execution');
            });
        });

    }).on('error', e => {
        console.log(e);
    });
}

exports.update = (id, schedule, url) => {
    this.delete(id);
    this.create(id, schedule, url)
}

exports.delete = (id) => {
    cron.cancelJob(id);
}

exports.recreateSchedules = () => {
    cronService.all()
        .then((crons) => {
            crons.map(cronItem => this.create(cronItem.id, cronItem.schedule, cronItem.url));
        })
        .catch((err) => {
            console.log(err);
        });
}
