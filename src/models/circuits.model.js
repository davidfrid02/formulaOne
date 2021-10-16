module.exports = (sequelize, Sequelize) => {
    const circuits = sequelize.define(
        'circuits',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: false,
            },
            name: {
                type: Sequelize.STRING,
            }
        },
        { indexes: [{ unique: true, fields: ['id'] }] }
    );

    return circuits;
};
