const mongoose = require('mongoose');

const CardSchema = require('./CardModel').schema;

const RoundSchema = new mongoose.Schema({

    roundNumber: {
        type: Number,
        required: true,
    },

    cardsPlayed: {
        type: [{
            card: CardSchema,
            player: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
                required: true,
            },
        }],
        default: [],
        validate: {
            validator: function (cardsPlayed) {
                return cardsPlayed.length <= 4;
            },
            message: 'A round cannot have more than 4 cards played',
        },
        required: true,
    },


});

module.exports = mongoose.model('Round', RoundSchema);