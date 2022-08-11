const express = require('express');
const router = express.Router();
const passport = require('passport');

const response = require('../../app/utils/response');

const service = require('./services');
const cronService = require('../cron/services');
const boom = require('@hapi/boom')

router.get('/user', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const cronLogs = await service.findByUser(req.user.sub)
        response.success(res, cronLogs, 'Cron logs');
    } catch (error) {
        next(error);
    }
})

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        if (! await cronService.isCronOwner(req.user.sub, req.params.id)) {
            throw boom.unauthorized()
        }
        const cronLogs = await service.find(req.params.id)
        response.success(res, cronLogs, 'Cron logs');
    } catch (error) {
        next(error);
    }
});

module.exports = router;
