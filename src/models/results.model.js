module.exports = (sequelize, Sequelize) => {
    const results = sequelize.define(
        'results',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: false,
            },
            raceId: {
                type: Sequelize.INTEGER,
            },
            driverId: {
                type: Sequelize.INTEGER,
            },
            number: {
                type: Sequelize.INTEGER,
            },
            points: {
                type: Sequelize.INTEGER,
            },
            position: {
                type: Sequelize.INTEGER,
            },
            laps: {
                type: Sequelize.INTEGER,
            },
            time: {
                type: Sequelize.STRING(15),
            },
            milliseconds: {
                type: Sequelize.INTEGER,
            },
            fastestLap: {
                type: Sequelize.INTEGER,
            },
            fastestLapTime: {
                type: Sequelize.STRING(10),
            },
            fastestLapSpeed: {
                type: Sequelize.STRING(7),
            },
        },
        { indexes: [{ unique: true, fields: ['id'] }] }
    );

    return results;
};
