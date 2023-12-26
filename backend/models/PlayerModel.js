const mongoose = require("mongoose");

const CardSchema = reqiure('./CardModel');

const PlayerSchema = new mongoose.Schema({
    playerName : {
        type: String,
        required: true,
        unique: true,
    },

    playerAvatar : {
        type: Buffer,
        required: true,
    },

    roundsWon : {
        type: Number,
        default: 0,
        required: true,
    },
    
    isTurn : {
        type: Boolean,
        default: false,
        required: true,
    },

    playerDeck : {
        type: [CardSchema],
        required: true,
    },

});

module.exports = PlayerSchema;