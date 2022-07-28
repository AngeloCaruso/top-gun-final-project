const cron = require('node-schedule');
const service = require('../../modules/cron/services');

exports.create = (id, schedule, url) => {
    cron.scheduleJob(id, schedule, () => {
        console.log(`Executing job ${id}`);
        console.log(`Sending a request to: ${url} on ${schedule}`);
        console.log('Job succeeded!');
    })
}

exports.update = (id, schedule, url) => {
    this.delete(id);
    this.create(id, schedule, url)
}

exports.delete = (id) => {
    cron.cancelJob(id);
}

exports.recreateSchedules = () => {
    service.all()
        .then((crons) => {
            crons.map(cronItem => this.create(cronItem.id, cronItem.schedule, cronItem.url));
        })
        .catch((err) => {
            console.log(err);
        });
}
