const utils = require('../utils');
const config = require('../config');
const NodeCache = require('node-cache');
const allTimeRankingCache = new NodeCache({ stdTTL: config.cacheTTL });
const sequilize = require('../models').sequelize;

module.exports = {
    allTimeRanking: async () => {
        try {
            let seasons = allTimeRankingCache.get('allTimeRanking');
            if (!seasons) {
                seasons = [];
                const query = createSeasonAllTimeRankingQuery();
                if (query) {
                    const results = await sequilize.query(query, {
                        bind: [config.numberOfDrivers],
                        type: sequilize.QueryTypes.SELECT,
                    });
                    if (results) {
                        for (let i = 0; i < results.length; i += config.numberOfDrivers) {
                            const season = getSeasonItem(results.slice(i, i + config.numberOfDrivers));
                            seasons.push(season);
                        }
                    }
                    allTimeRankingCache.set('allTimeRanking', seasons);
                } else {
                    throw { message: 'Failed query creation!' };
                }
            }
            return seasons;
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'seasons.service.js', 'allTimeRanking');
        }
    },
};

const getSeasonItem = (seasonTopDrivers) => {
    try{
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
    }catch(error){
        throw utils.errorMessage({}, error.message, 'seasons.service.js', 'getSeasonItem');

    }

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
