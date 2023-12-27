const mongoose = require('mongoose');

const PlayerSchema = require('./PlayerModel');

const TeamSchema = new mongoose.Schema({

    teamNumber: {
        type: Number,
        required: true,
    },

    teamPlayers:{ 
        type: [PlayerSchema],
        required: true,
    },

    roundsWon:{
        type: Number,
        default: 0,
        required: true,
    }
});

module.exports = mongoose.model('Team', TeamSchema);