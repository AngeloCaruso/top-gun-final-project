const db = require('mongoose');
const model = require('./model');
const bcrypt = require('bcrypt');


const env = require('../../config/env');

db.Promise = global.Promise;
db.connect(env.db, {
    useNewUrlParser: true,
});

exports.store = async (user) => {
    user.password = await bcrypt.hash(user.password,10);
    const newUser = new model(user);
    delete newUser.password;
    return await newUser.save();
}

exports.find = async (id) => {
    return await model.findById(id);
}

exports.findByEmailAndPassword = async (email, password) => {
    return await model.findOne({email: email, password: password});
}

exports.findByEmail = async (email) => {
    return await model.findOne({email: email});
}

exports.all = async () => {
    return await model.find({ active: 1 }).select('-password').exec();
}