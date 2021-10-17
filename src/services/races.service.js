const utils = require('../utils');
const sequilize = require('../models').sequelize;

module.exports = {
    getRaces: async (driverParam) => {
        try {
            let races = [];
            if (driverParam) {
                const driverQuery = createDriverQuery(driverParam);
                let driver;
                if (driverQuery) {
                    driver = await sequilize.query(driverQuery, { type: sequilize.QueryTypes.SELECT });
                } else {
                    throw { message: 'Failed driver query creation!' };
                }
                if (driver) {
                    const query = createRacesStatisticsByDriverQuery(driver.id);
                    if (query) {
                        drivers = await sequilize.query(query, { type: sequilize.QueryTypes.SELECT });
                    } else {
                        throw { message: 'Failed race statistics query creation!' };
                    }
                }
            } else {
                throw { message: 'Missing driver paramter' };
            }
            return races;
        } catch (error) {
            throw utils.errorMessage({}, error.message, 'races.service.js', 'getRaces');
        }
    },
};

const createRacesStatisticsByDriverQuery = (driverId) => {
    let query;
    if (driverId) {
        query = `
        SELECT 
            lapTimeStats."avarageLapTime", 
            raceFiltered."fastestLapTime",
            lapTimeStats."slowestLapTime", 
            pitStopsStats."numberOfPitStops",
            pitStopsStats."fastestPitStop",
            pitStopsStats."slowestPitStop",
            circuits."name" as circuitName, 
            raceFiltered."raceId", 
            raceFiltered."driverId", 
            raceFiltered."points", 
            raceFiltered."position"
        FROM
            (
                SELECT results."raceId", results."driverId", results."points", results."position", results."fastestLapTime"
                FROM results 
                WHERE results."driverId" = ${driverId}
            ) as raceFiltered
        JOIN races on races.id = raceFiltered."raceId"
        JOIN circuits on circuits."id" = races."circuitId"
        JOIN
            (
                SELECT MAX(milliseconds) /1000.0 * interval '1' as "slowestLapTime", AVG(milliseconds) /1000.0 * interval '1' as "avarageLapTime", lap_times."raceId"
                FROM lap_times 
                where lap_times."driverId" = ${driverId}
                GROUP BY lap_times."raceId"
            ) as lapTimeStats 
            on lapTimeStats."raceId" = raceFiltered."raceId" 
        JOIN
            (
                SELECT count(*) as "numberOfPitStops", MAX(pit_stops."milliseconds") /1000.0 * interval '1' as "slowestPitStop", MIN(pit_stops."milliseconds") /1000.0 * interval '1' as "fastestPitStop", pit_stops."raceId"
                from pit_stops
                where pit_stops."driverId" = ${driverId}
                GROUP BY pit_stops."raceId"
            ) as pitStopsStats 
            on pitStopsStats."raceId" = raceFiltered."raceId"
		`;
    }
    return query;
};

const createDriverQuery = (driverParam) => {
    let query;
    if (driverParam) {
        query = `
        SELECT 	
            drivers.number, 
            drivers.forename, 
            drivers.surname, 
            drivers.nationality, 
            drivers.dob as dateOfBirth, 
            drivers.url
        FROM drivers
        WHERE id = ${driverParam} 
        OR drivers.forename = ${driverParam}
        OR drivers.surname = ${driverParam}
		`;
    }
    return query;
};
