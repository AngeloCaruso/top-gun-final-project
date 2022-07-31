const express = require('express');
const router = express.Router();
const passport = require('passport')
const response = require('../../app/utils/response');
const authService = require('./services');

router.post('/login',
    passport.authenticate('local', { session: false }),
    (req, res) => {
        const user = req.user
        response.success(res, authService.siginToken(user), 'user logged in successfully!')
    }
);

module.exports = router;