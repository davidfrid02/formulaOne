const config = require('../config');
const utils = require('../utils');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticate: (request, response, next) => {
        try {
            const token = request.headers['access-token'];

            if (token) {
                jwt.verify(token, config.jwtKey);
            } else {
                throw { message: 'Missing Token' };
            }
            next();
        } catch (error) {
            response
                .status(401)
                .json(utils.errorMessage(error, error.message, 'authentication.middleware.js', 'authenticate'));
        }
    },
};
