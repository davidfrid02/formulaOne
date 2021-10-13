module.exports = (sequelize, Sequelize) => {
    const pitStops = sequelize.define('pit_stops', {
        raceId: {
            type: Sequelize.INTEGER,
        },
        driverId: {
            type: Sequelize.INTEGER,
        },
        stop: {
            type: Sequelize.INTEGER,
        },
        lap: {
            type: Sequelize.INTEGER,
        },
        time: {
            type: Sequelize.STRING(15),
        },
        duration: {
            type: Sequelize.STRING(10),
        },
        milliseconds: {
            type: Sequelize.INTEGER,
        },
    });

    return pitStops;
};
