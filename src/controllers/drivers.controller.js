const driversService = require('../services/drivers.service');
const utils = require('../utils');

module.exports = {
    getDriversBySeason: async (request, response) => {
        try {
            let drivers = [];
            if (request.params.season) {
                drivers = await driversService.getDrivers(request.params.season);
            } else {
                throw { message: 'Missing season parameter' };
            }
            response.status(200).json(drivers);
        } catch (error) {
            response.status(404).json(utils.errorMessage(error, error.message, 'drivers.controllers.js', 'getDriversBySeason'));
        }
    },
};
