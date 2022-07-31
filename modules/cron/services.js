const db = require('mongoose');
const model = require('./model');

const env = require('../../config/env');

db.Promise = global.Promise;
db.connect(env.db, {
    useNewUrlParser: true,
});

exports.all = async () => {
    return await model.find({ active: 1 }).exec();
}

exports.allByUser = async (userId) => {
    return await model.find({ active: 1,userId }).exec();
}

exports.find = async (id) => {
    return await model.findById(id);
}

exports.store = async (cron) => {
    const newCron = new model(cron);
    return await newCron.save();
}

exports.update = async (id, data) => {
    return await model.findByIdAndUpdate(id, data, { new: true })
}

exports.delete = async (id) => {
    return await model.findByIdAndDelete(id);
}

exports.isCronOwner = async (userId,cronId) => {
    return await model.exists({userId,_id:cronId})
}