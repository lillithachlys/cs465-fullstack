const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    
        if(!q) { // Database return no data
            return res
                .status(404)
                .json(err);
        } else {
            return res
                .status(200)
                .json(q);
        }

};

const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode }) // Return single record
        .exec();

        if(!q) { // Database return no data
            return res
                .status(404)
                .json(err);
        } else {
            return res
                .status(200)
                .json(q);
        }

};

module.exports = {
    tripsList,
    tripsFindByCode
};