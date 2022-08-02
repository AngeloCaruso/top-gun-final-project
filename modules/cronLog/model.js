const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cronLog = new schema({
    cron_id: {
        type: schema.Types.ObjectId,
        require: true,
        ref: 'cron'
    },
    user_id: {
        type: schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    response_log: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        require: true
    }
});

const model = mongoose.model('cron-log', cronLog);

module.exports = model;
