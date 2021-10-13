module.exports = (sequelize, Sequelize) => {
    const lapTimes = sequelize.define('lap_times', {
        raceId: {
            type: Sequelize.INTEGER,
        },
        driverId: {
            type: Sequelize.INTEGER,
        },
        lap: {
            type: Sequelize.INTEGER,
        },
        position: {
            type: Sequelize.INTEGER,
        },
        time: {
            type: Sequelize.STRING(15),
        },
        milliseconds: {
            type: Sequelize.INTEGER,
        },
    });

    return lapTimes;
};
