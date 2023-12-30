const mongoose = require('mongoose');

const RoundSchema = require('./RoundModel').schema;
const TeamSchema = require('./TeamModel').schema;

const GameSchema = new mongoose.Schema({
    
    lobbyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lobby',
        required: true,
    },

    team1: {
        type: TeamSchema,
        ref: 'Lobby',
        required: true,
    },

    team2: {
        type: TeamSchema,
        ref: 'Lobby',
        required: true,
    },

    gameWinner: {
        type: TeamSchema,
        default: null,
        required: true,
    },

    rounds: {
        type: [RoundSchema],
        required: true,
        default: [],
    }

});

module.exports = mongoose.model('Game', GameSchema);