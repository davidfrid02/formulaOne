module.exports = (sequelize, Sequelize) => {
    const drivers = sequelize.define(
        'drivers',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: false,
            },
            number: {
                type: Sequelize.INTEGER,
            },
            forename: {
                type: Sequelize.STRING(30),
            },
            surname: {
                type: Sequelize.STRING(30),
            },
            dob: {
                type: Sequelize.DATE,
            },
            nationality: {
                type: Sequelize.STRING(25),
            },
            url: {
                type: Sequelize.STRING,
            },
        },
        { indexes: [{ unique: true, fields: ['id'] }], timestamps: false }
    );

    return drivers;
};
