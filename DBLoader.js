const fs = require('fs');
const csv = require('fast-csv');
const db = require('./src/models');
const { resolve } = require('path');
const { reject } = require('lodash');

const init = async () => {
    try {
        await db.sequelize.sync({ force: true });
    } catch (error) {
        throw error;
    }
};

const readCSVAndInsertToDB = (tableName, objectCreator) => {
    return new Promise((resolve, reject) => {
        try {
            if (tableName) {
                const data = [];
                fs.createReadStream(`./csvFiles/${tableName}.csv`)
                    .pipe(csv.parse({ headers: true }))
                    .on('error', (error) => reject(error))
                    .on('data', (row) => {
                        const objectToCreate = objectCreator(row);
                        if (objectToCreate) {
                            data.push(objectToCreate);
                        }
                    })
                    .on('end', async (rowCount) => {
                        try {
                            if (data) {
                                await db[tableName].bulkCreate(data);
                                console.log(`Table name: ${tableName}, Inserted ${rowCount} rows`);
                                resolve();
                            } else {
                                reject('No data!');
                            }
                        } catch (error) {
                            reject(error);
                        }
                    });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const driverObjectCreator = (row) => {
    return {
        id: Number(row.driverId),
        number: row.number !== '\\N' ? Number(row.number) : -1,
        forename: row.forename,
        surname: row.surname,
        dob: row.dob,
        nationality: row.nationality,
        url: row.url,
    };
};

const driverStangingObjectCreator = (row) => {
    return {
        id: Number(row.driverStandingsId),
        raceId: Number(row.raceId),
        driverId: Number(row.driverId),
        wins: Number(row.wins),
    };
};

const racesObjectCreator = (row) => {
    return {
        id: Number(row.raceId),
        year: Number(row.year),
        name: row.name,
    };
};

const lapTimesObjectCreator = (row) => {
    return {
        raceId: Number(row.raceId),
        driverId: Number(row.driverId),
        lap: Number(row.lap),
        position: Number(row.position),
        time: row.time,
        milliseconds: Number(row.milliseconds),
    };
};

const pitStopsObjectCreator = (row) => {
    return {
        raceId: Number(row.raceId),
        driverId: Number(row.driverId),
        stop: Number(row.stop),
        lap: Number(row.lap),
        time: row.time,
        duration: row.duration,
        milliseconds: Number(row.milliseconds),
    };
};

const resultsObjectCreator = (row) => {
    return {
        id: Number(row.resultId),
        raceId: Number(row.raceId),
        driverId: Number(row.driverId),
        number: row.number !== '\\N' ? Number(row.number) : -1,
        position: row.position !== '\\N' ? Number(row.position) : -1,
        laps: row.laps !== '\\N' ? Number(row.laps) : -1,
        time: row.time,
        milliseconds: row.milliseconds !== '\\N' ? Number(row.milliseconds) : -1,
        fastestLap: row.fastestLap !== '\\N' ? Number(row.fastestLap) : -1,
        fastestLapTime: row.fastestLapTime,
        fastestLapSpeed: row.fastestLapSpeed,
    };
};

(async () => {
    try {
        await init();
        await Promise.all([
            readCSVAndInsertToDB('drivers', driverObjectCreator),
            readCSVAndInsertToDB('driver_standings', driverStangingObjectCreator),
            readCSVAndInsertToDB('races', racesObjectCreator),
            readCSVAndInsertToDB('lap_times', lapTimesObjectCreator),
            readCSVAndInsertToDB('pit_stops', pitStopsObjectCreator),
            readCSVAndInsertToDB('results', resultsObjectCreator),
        ]);
        console.log('Finished loading successfully :-)');
    } catch (error) {
        console.log(error);
    }
})();
