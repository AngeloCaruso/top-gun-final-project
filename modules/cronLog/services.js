const db = require('mongoose');
const model = require('./model');
const cronModel = require('../cron/model');

const env = require('../../config/env');

db.Promise = global.Promise;
db.connect(env.db, {
    useNewUrlParser: true,
});

exports.find = async (id) => {
    return await model.find({ cron_id: id }).exec();
}

exports.findByUser = async (userId) => {
    return await model.find({ user_id: userId })
        .populate('cron_id')
        .limit(8)
        .exec();
}

exports.store = async (log) => {
    const newCronLog = new model(log);
    newCronLog.created_at = Date.now();
    return await newCronLog.save();
}
