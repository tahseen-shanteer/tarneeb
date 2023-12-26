const mongoose = require('mongoose');

const PlayerSchema = require('./PlayerModel');
const TeamSchema = require('./TeamModel');

const GameSchema = new mongoose.Schema({
    
    lobbyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lobby',
        required: true,
    },

    teams: {
        type: [TeamSchema],
        required: true,
    },

    gameWinner: {
        type: TeamSchema,
        required: false,
    },

    roundsPlayed: {
        type: Number,
        default: 0,
        required: true,
    },


});

module.exports = GameSchema;