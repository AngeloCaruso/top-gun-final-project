const config = require('../../config/env')
const jwt = require('jsonwebtoken');
const userService = require('../users/services');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

exports.siginToken = (user) => {
    const payload = {
        sub: user.id || user._id.toString(),
    }
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpirationTime })
    const data = { user, token }
    return data;
}

exports.getUser = async (email, password) => {
    const user = await userService.findByEmail(email);
    if (!user) {
        throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw boom.unauthorized();
    }
    return user;
}