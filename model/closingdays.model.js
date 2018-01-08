const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SportsFacility = require('../model/sportsfacility.model');

const ClosingDaysSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required.']
    },
    reason: String,
});

module.exports = ClosingDaysSchema;