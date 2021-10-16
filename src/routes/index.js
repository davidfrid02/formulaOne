const router = require('express').Router();
const config = require('../config');
const seasonsController = require('../controllers/seasons.controller');
const driversController = require('../controllers/drivers.controller');

router.get(`${config.baseUrl}/seasons`, seasonsController.getAllTimeRanking);
router.get(`${config.baseUrl}/seasons/:season/drivers`, driversController.getDriversBySeason);



router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

module.exports = router;
