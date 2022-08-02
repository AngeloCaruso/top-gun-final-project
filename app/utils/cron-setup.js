const cron = require('node-schedule');
const cronService = require('../../modules/cron/services');
const cronLogService = require('../../modules/cronLog/services');
const https = require('https');

exports.create = (id, schedule, url, user) => {
    cron.scheduleJob(id, schedule, () => {
        console.log(`Executing job ${id}`);
        console.log(`Sending a request to: ${url} on ${schedule}`);

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                cronLogService.store({
                    cron_id: id,
                    user_id: user,
                    response_log: data.toString(),
                    status: res.statusCode
                });
                console.log('Job succeeded!');
            });
        });

    }).on('error', e => {
        console.log(e);
    });
}

exports.update = (id, schedule, url, active, user) => {
    this.delete(id);
    if (active) {
        this.create(id, schedule, url, user)
    }
}

exports.delete = (id) => {
    cron.cancelJob(id);
}

exports.recreateSchedules = () => {
    cronService.all()
        .then((crons) => {
            crons.map(cronItem => this.create(cronItem.id, cronItem.schedule, cronItem.url, cronItem.userId));
        })
        .catch((err) => {
            console.log(err);
        });
}
