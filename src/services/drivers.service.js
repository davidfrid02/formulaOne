const utils = require('../utils');
const config = require('../config');
const NodeCache = require('node-cache');
const driversCache = new NodeCache({ stdTTL: config.cacheTTL });
const sequilize = require('../models').sequelize;

module.exports = {
    getDrivers: async (season) => {
        try {
            let drivers;
            if (season) {
                drivers = driversCache.get(season);
                if (!drivers) {
                    const query = createDriversWinsBySeasonQuery();
                    if (query) {
                        drivers = await sequilize.query(query, { bind: [season], type: sequilize.QueryTypes.SELECT });
                        driversCache.set(season, drivers);
                    } else {
                        throw { message: 'Failed query creation!' };
                    }
                }
            } else {
                throw { message: 'Missing season paramter' };
            }
            return drivers || [];
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'drivers.service.js', 'getDrivers');
        }
    },
};

const createDriversWinsBySeasonQuery = () => {
    return `		
	SELECT 
        drivers.id as driverId, 
        winsByYear."maxWins", 
        drivers.number, 
        drivers.forename, 
        drivers.surname, 
        drivers.nationality, 
        drivers.dob as dateOfBirth, 
        drivers.url
    FROM
        (
            SELECT 
                distinct driver_standings."driverId", 
                MAX(wins) as "maxWins"
            FROM races 
            JOIN driver_standings on driver_standings."raceId" = races.id
            WHERE races.year = $1
            GROUP BY "driverId"
        ) as winsByYear 
        JOIN drivers on drivers.id = winsByYear."driverId"
        ORDER BY "maxWins" DESC`;
};
