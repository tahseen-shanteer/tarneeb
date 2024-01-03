const mongoose = require("mongoose");

const CardSchema = require('./CardModel').schema;

const PlayerSchema = new mongoose.Schema({
    playerName : {
        type: String,
        required: true,
    },

    playerAvatar : {
        type: Buffer,
        required: false,
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
        default: [],
        validate: {
            validator: function (playerDeck) {
                return playerDeck.length <= 13;
            },
            message: 'A player cant have more than 13 cards',
        },
        required: true,
    },

});

module.exports = mongoose.model('Player', PlayerSchema);