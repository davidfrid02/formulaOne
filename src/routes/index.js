const router = require('express').Router();
const config = require('../config');
const seasonsController = require('../controllers/seasons.controller');
const driversController = require('../controllers/drivers.controller');
const racesController = require('../controllers/races.controller');
const authenticationController = require('../controllers/authentication.controller');
const authentication = require('../middleware/authentication.middleware');

router.get(`${config.baseUrl}/seasons`, authentication.authenticate, seasonsController.getAllTimeRanking);
router.get(
    `${config.baseUrl}/seasons/:season/drivers`,
    authentication.authenticate,
    driversController.getDriversBySeason
);
router.get(`${config.baseUrl}/drivers/:driverParam/races`, authentication.authenticate, racesController.getRaces);

router.post(`${config.baseUrl}/register`, authenticationController.register);
router.post(`${config.baseUrl}/login`, authenticationController.login);

router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
