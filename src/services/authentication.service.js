const utils = require('../utils');
const config = require('../config');
const jwt = require('jsonwebtoken');
const Users = require('../models').users;

module.exports = {
    register: async (userName, password) => {
        try {
            const user = await Users.findOne({ where: { userName: userName } });
            if (user) {
                throw { message: 'User Already Exist' };
            }

            await Users.create({
                userName: userName,
                password: password,
            });
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'authentication.service.js', 'register');
        }
    },

    login: async (userName, password) => {
        try {
            let token;
            const user = await Users.findOne({ where: { userName: userName } });
            if (user && user.password === password) {
                token = jwt.sign({ userName: user.userName, password: user.password }, config.jwtKey, {
                    expiresIn: '12h',
                });
            } else {
                throw { message: 'Invalid Credentials' };
            }
            return token;
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'authentication.service.js', 'login');
        }
    },
};
