const express = require('express');
const router = express.Router();

const response = require('../../app/utils/response');
const service = require('./services');
const { validatorHandler } = require('../../app/middlewares/validator.handler');
const schema = require('./schema');
const boom = require('@hapi/boom')

router.post('/',
    validatorHandler(schema.createUserSchema, 'body'),
    async (req, res, next) => {
        try {
            const { email } = req.body;
            if (await service.findByEmail(email)) {
                throw boom.badRequest('this email already exists');
            }
            const user = await service.store(req.body)
            response.success(res, user, 'user created', 201);
        } catch (error) {
            next(error);
        }
    });

router.get('/', async (req, res) => {
    try {
        const users = await service.all();
        response.success(res, users, 'users list');
    } catch (error) {
        next(error);
    }
});

module.exports = router;