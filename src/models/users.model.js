module.exports = (sequelize, Sequelize) => {
    const users = sequelize.define(
        'users',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
        },
        { indexes: [{ unique: true, fields: ['id'] }], timestamps: false }
    );

    return users;
};
