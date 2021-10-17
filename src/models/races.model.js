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
            circuitId: {
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING(50),
            },
            date: {
                type: Sequelize.DATE,
            },
        },
        { indexes: [{ unique: true, fields: ['id'] }], timestamps: false }
    );

    return races;
};
