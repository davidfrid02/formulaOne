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
            response.status(404).json(utils.errorMessage(error, error.message, 'races.controller.js', 'getRaces'));
        }
    },
};
