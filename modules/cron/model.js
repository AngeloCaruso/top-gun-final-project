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
    save_history: {
        type: Boolean,
        required: false,
        default: 0
    },
    schedule: {
        type: String,
        required: true
    }
})

const model = mongoose.model('crons', cron);

module.exports = model;