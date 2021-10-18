const seasonsService = require('../services/seasons.service');
const utils = require('../utils');

module.exports = {
    getAllTimeRanking: async (request, response) => {
        try {
            let seasons = [];
            if (request.query && request.query.allTimeRanking === 'true') {
                seasons = await seasonsService.allTimeRanking(request.query.numberOfDrivers);
            } 
            response.status(200).json(seasons);
        } catch (error) {
            response.status(404).json(utils.errorMessage(error, error.message, 'seasons.controller.js', 'getAllTimeDrivers'));
        }
    },
};
