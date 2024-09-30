const express = require('express');
const router = express.Router();
const tracerouteController = require('../controllers/tracertController');

// Rota para nslookup
router.get('/dig/:host', tracerouteController.dig);

// Rota para traceroute
router.get('/traceroute/:host', tracerouteController.traceroute);

module.exports = router;
