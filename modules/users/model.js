const mongoose = require('mongoose');
const schema = mongoose.Schema;

const user = new schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
})

const model = mongoose.model('user', user);

module.exports = model;