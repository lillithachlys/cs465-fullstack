const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if(authHeader == null)
    {
        console.log('Auth Header Required but NOT PRESENT!');
        return res
            .sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if(headers.length < 1)
    {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res
            .sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    if(token == null)
    {
        console.log('Null Bearer Token');
        return res
            .sendStatus(401);
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res
                .sendStatus(401)
                .json('Token Validation Error!');
        }
        req.auth = verified;
    });
    next();
}

// route for register endpoint
router
    .route('/register')
    .post(authController.register);

// route for login endpoint
router
    .route('/login')
    .post(authController.login);

// route for trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST

// GET method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip); // PUT

module.exports = router;