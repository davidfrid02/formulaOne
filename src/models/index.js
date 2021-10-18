const config = require('../config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    operatorsAliases: 0,
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
});

const drivers = require('./drivers.model.js')(sequelize, Sequelize);
const driverStandings = require('./driverStandings.model.js')(sequelize, Sequelize);
const races = require('./races.model.js')(sequelize, Sequelize);
const lapTimes = require('./lapTimes.model.js')(sequelize, Sequelize);
const pitStops = require('./pitStops.model.js')(sequelize, Sequelize);
const results = require('./results.model.js')(sequelize, Sequelize);
const circuits = require('./circuits.model.js')(sequelize, Sequelize);
const users = require('./users.model.js')(sequelize, Sequelize);

const db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    drivers: drivers,
    driver_standings: driverStandings,
    races: races,
    lap_times: lapTimes,
    pit_stops: pitStops,
    results: results,
    circuits: circuits,
    users: users
};

module.exports = db;
