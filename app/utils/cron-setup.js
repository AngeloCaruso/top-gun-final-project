const cron = require('node-schedule');

exports.create = (id, schedule, url) => {
    cron.scheduleJob(id, schedule, () => {
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