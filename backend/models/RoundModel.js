const mongoose = require('mongoose');

const CardSchema = reqiure('./CardModel');

const RoundSchema = new mongoose.Schema({

    roundNumber: {
        type: Number,
        required: true,
    },

    cardsPlayed: {
        type: [CardSchema],
        required: true,
    },


});

module.exports = RoundSchema;