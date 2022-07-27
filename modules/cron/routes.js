const express = require('express');
const router = express.Router();

const response = require('../../app/utils/response');

const service = require('./services');

router.get('/', (req, res) => {
    service.all()
        .then((crons) => {
            response.success(res, crons, 'Crons list');
        })
        .catch((err) => {
            response.error(res, err, 500);
        });
});

router.get('/:id', (req, res) => {
    service.find(req.params.id)
        .then((cron) => {
            response.success(res, cron, 'Cron details');
        })
        .catch((err) => {
            response.error(res, err, 500);
        })
});

router.post('/', (req, res) => {
    service.store(req.body)
        .then((cron) => {
            response.success(res, cron, 'Cron created!', 201);
        })
        .catch((err) => {
            response.error(res, err, 500);
        });
});

router.patch('/:id', (req, res) => {
    service.update(req.params.id, req.body)
        .then((cron) => {
            response.success(res, cron, 'Cron updated!', 201);
        })
        .catch((err) => {
            response.error(res, err, 500);
        });
});

router.delete('/:id', (req, res) => {
    service.delete(req.params.id)
        .then((cron) => {
            response.success(res, null, 'Cron deleted!', 201);
        })
        .catch((err) => {
            response.error(res, err, 500);
        });
});

module.exports = router;