const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cronLog = new schema({
    cron_id: {
        type: String,
        require: true
    },
    response_log: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const model = mongoose.model('cron-log', cronLog);

module.exports = model;
