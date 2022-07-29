const db = require('mongoose');
const model = require('./model');

const env = require('../../config/env');

db.Promise = global.Promise;
db.connect(env.db, {
    useNewUrlParser: true,
});

exports.find = async (id) => {
    return await model.find({ cron_id: id }).exec();
}

exports.store = async (log) => {
    const newCronLog = new model(log);
    return await newCronLog.save();
}
