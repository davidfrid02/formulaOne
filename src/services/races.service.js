const utils = require('../utils');
const sequilize = require('../models').sequelize;

module.exports = {
    getRaces: async (driverParam, paramType) => {
        try {
            let data = {};
            if (driverParam) {
                const driverQuery = createDriverQuery(driverParam, paramType);
                let driver;
                if (driverQuery) {
                    driver = await sequilize.query(driverQuery, {
                        type: sequilize.QueryTypes.SELECT,
                    });
                } else {
                    throw { message: 'Failed driver query creation!' };
                }
                if (driver && driver.length) {
                    const query = createRacesStatisticsByDriverQuery();
                    if (query) {
                        const races = await sequilize.query(query, {
                            bind: [driver[0].id],
                            type: sequilize.QueryTypes.SELECT,
                        });
                        data.driver = driver[0];
                        data.races = races;
                    } else {
                        throw { message: 'Failed race statistics query creation!' };
                    }
                }
            } else {
                throw { message: 'Missing driver paramter' };
            }
            return data;
        } catch (error) {
            throw utils.errorMessage(error, error.message, 'races.service.js', 'getRaces');
        }
    },
};

const createRacesStatisticsByDriverQuery = () => {
    return `
        SELECT 
            lapTimeStats."avarageLapTime", 
            raceFiltered."fastestLapTime",
            lapTimeStats."slowestLapTime", 
            pitStopsStats."numberOfPitStops",
            pitStopsStats."fastestPitStop",
            pitStopsStats."slowestPitStop",
            circuits."name" AS circuitName, 
            raceFiltered."points", 
            raceFiltered."position",
            races.date
        FROM
            (
                SELECT 
                    results."raceId", 
                    results."driverId", 
                    results."points", 
                    results."position", 
                    results."fastestLapTime"
                FROM results 
                WHERE results."driverId" = $1
            ) AS raceFiltered
        JOIN races ON races.id = raceFiltered."raceId"
        JOIN circuits ON circuits."id" = races."circuitId"
        LEFT JOIN
            (
                SELECT
                    TO_CHAR(MAX(milliseconds) /1000.0 * interval '1','MI:SS.ms') as "slowestLapTime", 
                    TO_CHAR(AVG(milliseconds) /1000.0 * interval '1', 'MI:SS.ms') as "avarageLapTime", 
                    lap_times."raceId"
                FROM lap_times 
                WHERE lap_times."driverId" = $1
                GROUP BY lap_times."raceId"
            ) AS lapTimeStats ON lapTimeStats."raceId" = raceFiltered."raceId" 
        LEFT JOIN
            (
                SELECT 
                    COUNT(*) AS "numberOfPitStops", 
                    TO_CHAR(MAX(pit_stops."milliseconds") /1000.0 * interval '1', 'MI:SS.ms') as "slowestPitStop",
                    TO_CHAR(MIN(pit_stops."milliseconds") /1000.0 * interval '1', 'MI:SS.ms') as "fastestPitStop", 
                    pit_stops."raceId"
                FROM pit_stops
                WHERE pit_stops."driverId" = $1
                GROUP BY pit_stops."raceId"
            ) AS pitStopsStats ON pitStopsStats."raceId" = raceFiltered."raceId"
        ORDER BY races.date ASC`;
};

const createDriverQuery = (driverParam, paramType) => {
    let query;
    if (driverParam) {
        query = `
        SELECT 	
            drivers.id, 
            drivers.number, 
            drivers.forename, 
            drivers.surname, 
            drivers.nationality, 
            drivers.dob as dateOfBirth, 
            drivers.url
        FROM drivers
		`;
        if (paramType === 'id') {
            query += ` WHERE id = ${Number(driverParam)}`;
        } else {
            const driverName = driverParam.split(' ');
            if (driverName.length === 2) {
                query += ` WHERE drivers.forename = '${driverName[0]}' 
                AND drivers.surname = '${driverName[1]}'`;
            } else {
                throw utils.errorMessage(
                    {},
                    'driver name should be with first and last Name',
                    'races.service.js',
                    'createDriverQuery'
                );
            }
        }
    }
    return query;
};
