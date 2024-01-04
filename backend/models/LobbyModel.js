const mongoose = require('mongoose');

const PlayerSchema = require('./PlayerModel').schema;
const CardSchema = require('./CardModel').schema;

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
        unique: true,
    },

    team1: {
        type: [PlayerSchema],
        required: true,
    },

    team2: {
        type: [PlayerSchema],
        required: true,
    },

});

module.exports = mongoose.model('Lobby', LobbySchema);