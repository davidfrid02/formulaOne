module.exports = (sequelize, Sequelize) => {
    const driverStandings = sequelize.define(
        'driver_standings',
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
            wins: {
                type: Sequelize.INTEGER,
            },
        },
        { indexes: [{ unique: true, fields: ['id'] }] }
    );

    return driverStandings;
};
