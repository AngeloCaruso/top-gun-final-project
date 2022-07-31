const db = require('mongoose');
const model = require('./model');
const bcrypt = require('bcrypt');


const env = require('../../config/env');

db.Promise = global.Promise;
db.connect(env.db, {
    useNewUrlParser: true,
});

exports.store = async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    const userModel = new model(user);
    const newUser = await userModel.save();
    const { password, ...data } = newUser._doc;
    return data;
}

exports.find = async (id) => {
    return await model.findById(id);
}

exports.findByEmailAndPassword = async (email, password) => {
    return await model.findOne({ email: email, password: password });
}

exports.findByEmail = async (email) => {
    return await model.findOne({ email: email }).select('+password');
}

exports.all = async () => {
    return await model.find({ active: 1 }).exec();
}