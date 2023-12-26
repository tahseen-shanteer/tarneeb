const mongoose = require('mongoose');

const PlayerSchema = require('./PlayerModel');
const CardSchema = require('./CardModel');

const LobbySchema = new mongoose.Schema({
    players: {
        type: [PlayerSchema],
        required: true,
    },

    lobbyDeck: {
        type: [CardSchema],
        required: true,
    },

    lobbyCode: {
        type: String,
        required: true,
    }
});

module.exports = LobbySchema;