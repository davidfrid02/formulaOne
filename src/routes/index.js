const router = require('express').Router();
const config = require('../config');
const driversController = require('../controllers/drivers.controller');

router.get(`${config.baseUrl}/seasons/:seasonId/drivers`, driversController.getDrivers);

router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
