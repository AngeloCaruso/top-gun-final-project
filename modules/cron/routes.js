const express = require('express');
const router = express.Router();

const response = require('../../app/utils/response');

const service = require('./services');
const cronManager = require('../../app/utils/cron-setup');
const passport = require('passport');
const boom = require('@hapi/boom');

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        const crons = await service.allByUser(req.user.sub);
        response.success(res, crons, 'Crons list');
    } catch (error) {
        next(error);
    }
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        if (! await service.isCronOwner(req.user.sub, req.params.id)) {
            throw boom.unauthorized()
        }
        const crons = await service.find(req.params.id);
        response.success(res, crons, 'Crons details');
    } catch (error) {
        next(error);
    }
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        req.body.userId = req.user.sub
        const cron = await service.store(req.body)
        cronManager.create(cron.id, cron.schedule, cron.url);
        response.success(res, cron, 'Cron created!', 201);
    } catch (error) {
        next(error);
    }
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        if (! await service.isCronOwner(req.user.sub, req.params.id)) {
            throw boom.unauthorized()
        }
        const cron = await service.update(req.params.id, req.body)
        cronManager.update(cron.id, cron.schedule, cron.url)
        response.success(res, cron, 'Cron updated!', 200);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        if (! await service.isCronOwner(req.user.sub, req.params.id)) {
            throw boom.unauthorized()
        }
        const cron = await service.delete(req.params.id)
        cronManager.delete(cron.id);
        response.success(res, null, 'Cron deleted!', 200);
    } catch (error) {
        next(error);
    }
});

router.get('/logs', (req, res) => {

})

module.exports = router;