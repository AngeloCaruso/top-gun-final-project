const express = require('express');
const router = express.Router();
const passport = require('passport')
const response = require('../../app/utils/response');
const config = require('../../config/env')
const jwt = require('jsonwebtoken');

router.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const user = req.user
        const payload = {
            sub: user.id,
        }

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpirationTime })
        const data = { user, token }
        response.success(res, data, 'user logged in successfully!')
    }
);

module.exports = router;