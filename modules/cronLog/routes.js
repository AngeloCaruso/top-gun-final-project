const express = require('express');
const router = express.Router();

const response = require('../../app/utils/response');

const service = require('./services');

router.get('/:id', (req, res) => {
    service.find(req.params.id)
        .then((logs) => {
            response.success(res, logs, 'Cron logs');
        })
        .catch((err) => {
            response.error(res, err, 500);
        })
});

module.exports = router;
