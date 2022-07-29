const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cron = new schema({
    name: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        required: true
    },
    schedule: {
        type: String,
        required: true
    }
})

const model = mongoose.model('cron', cron);

module.exports = model;