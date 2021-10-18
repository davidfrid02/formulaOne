const authenticationService = require('../services/authentication.service');
const utils = require('../utils');

module.exports = {
    register: async (request, response) => {
        try {
            if (request.body && request.body.userName && request.body.password) {
                await authenticationService.register(request.body.userName, request.body.password);
            } else {
                throw { message: 'Missing userName OR password' };
            }
            response.status(200).json({ status: 'success' });
        } catch (error) {
            response
                .status(500)
                .json(utils.errorMessage(error, error.message, 'authentication.controller.js', 'register'));
        }
    },

    login: async (request, response) => {
        try {
            let token = '';
            if (request.body && request.body.userName && request.body.password) {
                token = await authenticationService.login(request.body.userName, request.body.password);
            } else {
                throw { message: 'Missing userName OR password' };
            }
            response.status(200).json({ token: token });
        } catch (error) {
            response
                .status(500)
                .json(utils.errorMessage(error, error.message, 'authentication.controller.js', 'login'));
        }
    },
};
