module.exports = (sequelize, Sequelize) => {
    const races = sequelize.define(
        'races',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: false,
            },
            year: {
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(50),
            },
        },
        { indexes: [{ unique: true, fields: ['id'] }] }
    );

    return races;
};
