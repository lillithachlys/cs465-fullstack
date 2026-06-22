const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET
    .post(tripsController.tripsAddTrip); // POST

// GET method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip); // PUT

module.exports = router;