const utils = require('../utils');
const sequilize = require('../models').sequelize;

module.exports = {
    getDrivers: async (season) => {
        try {
            let drivers = [];
            if (season) {
                const query = createDriversWinsBySeasonQuery(season);
                if (query) {
                    drivers = await sequilize.query(query, { type: sequilize.QueryTypes.SELECT });
                } else {
                    throw { message: 'Failed query creation!' };
                }
            } else {
                throw { message: 'Missing season paramter' };
            }
            return drivers;
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'drivers.service.js', 'getDrivers');
        }
    },
};

const createDriversWinsBySeasonQuery = (season) => {
    let query;
    if (season) {
        query = `
		SELECT drivers.id as driverId, winsByYear.max_wins as wins, drivers.number, drivers.forename, drivers.surname, drivers.nationality, drivers.dob as dateOfBirth, drivers.url
		FROM drivers
		JOIN 
			(
				SELECT distinct "driverId", MAX(wins) as max_wins
				FROM driver_standings
				JOIN 
				(
					SELECT *
					FROM races 
					WHERE year = ${season}
				) as raceYear on raceYear.id = driver_standings."raceId"
				GROUP BY "driverId"
			) as winsByYear on drivers.id = winsByYear."driverId"
		ORDER BY max_wins DESC`;
    }
    return query;
};
