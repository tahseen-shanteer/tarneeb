const mongoose = require('mongoose');

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

});

module.exports = mongoose.model('Game', GameSchema);