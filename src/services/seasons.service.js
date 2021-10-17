const utils = require('../utils');
const numberOfDrivers = require('../config').numberOfDrivers;
const sequilize = require('../models').sequelize;

module.exports = {
    allTimeRanking: async () => {
        try {
            const seasons = [];
            const query = createSeasonAllTimeRankingQuery();
            if (query) {
                const results = await sequilize.query(query, { bind:[numberOfDrivers], type: sequilize.QueryTypes.SELECT });
                if (results) {
                    for (let i = 0; i < results.length; i += numberOfDrivers) {
                        const season = getSeasonItem(results.slice(i, i + numberOfDrivers));
                        seasons.push(season);
                    }
                }
            } else {
                throw { message: 'Failed query creation!' };
            }
            return seasons;
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'seasons.service.js', 'allTimeRanking');
        }
    },
};

const getSeasonItem = (seasonTopDrivers) => {
    const season = {};
    if (seasonTopDrivers) {
        const year = seasonTopDrivers[0].year;
        seasonTopDrivers.map((driver) => {
            delete driver.year;
        });
        season.season = year;
        season.drivers = seasonTopDrivers;
    }
    return season;
};

const createSeasonAllTimeRankingQuery = () => {
    return `
	SELECT 
        maxPointsByYear.year, 
        maxPointsByYear.maxPoints,
        drivers.number, 
        drivers.forename,
        drivers.surname,
        drivers.nationality, 
        drivers.dob as dateOfBirth,
        drivers.url
	FROM
	(
		SELECT 
            distinct races.year, 
            MAX(points) as maxPoints, 
            driver_standings."driverId",
		ROW_NUMBER () OVER (
			PARTITION BY races.year
			ORDER BY MAX(points) DESC
	    )
		FROM driver_standings
		JOIN races on races.id = driver_standings."raceId"
		GROUP BY races.year, driver_standings."driverId"
		ORDER BY races.year, maxPoints DESC
	) as maxPointsByYear	
	JOIN drivers on drivers.id = maxPointsByYear."driverId"
	WHERE maxPointsByYear."row_number" <= $1`;
};
