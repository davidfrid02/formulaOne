const racesService = require('../services/races.service');
const utils = require('../utils');

module.exports = {
    getRaces: async (request, response) => {
        try {
            let result = {};
            if (request.params.driverParam) {
                let paramType = 'id';
                const castedDriverId = Number(request.params.driverParam);
                if (isNaN(castedDriverId)) {
                    paramType = 'name';
                }
                result = await racesService.getRaces(request.params.driverParam, paramType);
            } else {
                throw { message: 'Missing driver parameter' };
            }
            response.status(200).json(result);
        } catch (error) {
            response.status(404).json(utils.errorMessage(error, error.message, 'races.controllers.js', 'getRaces'));
        }
    },

    getDriverDetails: async (request, response) => {
        try {
            let drivers = [];
            if (request.params.season) {
                drivers = await driversService.getDrivers(request.params.season);
            } else {
                throw { message: 'Missing season parameter' };
            }
            response.status(200).json(drivers);
        } catch (error) {
            response
                .status(404)
                .json(utils.errorMessage(error, error.message, 'drivers.controllers.js', 'getDriversBySeason'));
        }
    },
};
