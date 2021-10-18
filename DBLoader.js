const fs = require('fs');
const csv = require('fast-csv');
const db = require('./src/models');

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
        points: Number(row.points),
        wins: Number(row.wins),
    };
};

const racesObjectCreator = (row) => {
    return {
        id: Number(row.raceId),
        year: Number(row.year),
        circuitId: Number(row.circuitId),
        name: row.name,
        date: row.date,
    };
};

const lapTimesObjectCreator = (row) => {
    return {
        raceId: Number(row.raceId),
        driverId: Number(row.driverId),
        time: row.time,
        milliseconds: Number(row.milliseconds),
    };
};

const pitStopsObjectCreator = (row) => {
    return {
        raceId: Number(row.raceId),
        driverId: Number(row.driverId),
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
        points: Number(row.points),
        position: row.position !== '\\N' ? Number(row.position) : -1,
        fastestLapTime: row.fastestLapTime,
    };
};

const circuitsObjectCreator = (row) => {
    return {
        id: Number(row.circuitId),
        name: row.name,
    };
};

(async () => {
    try {
        console.log('Starting...');
        await db.sequelize.sync({ force: true });
        await Promise.all([
            readCSVAndInsertToDB('drivers', driverObjectCreator),
            readCSVAndInsertToDB('driver_standings', driverStangingObjectCreator),
            readCSVAndInsertToDB('races', racesObjectCreator),
            readCSVAndInsertToDB('lap_times', lapTimesObjectCreator),
            readCSVAndInsertToDB('pit_stops', pitStopsObjectCreator),
            readCSVAndInsertToDB('results', resultsObjectCreator),
            readCSVAndInsertToDB('circuits', circuitsObjectCreator),
        ]);
        console.log('Finished loading successfully :-)');
    } catch (error) {
        console.log(error);
    }
})();
