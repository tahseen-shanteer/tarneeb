const mongoose = require('mongoose');

const CardSchema = require('./CardModel');

const RoundSchema = new mongoose.Schema({

    roundNumber: {
        type: Number,
        required: true,
    },

    cardsPlayed: {
        type: [CardSchema],
        default: [],
        required: true,
    },


});

module.exports = mongoose.model('Round', RoundSchema);