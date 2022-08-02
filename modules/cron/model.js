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
    },
    userId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
})

const model = mongoose.model('cron', cron);

module.exports = model;