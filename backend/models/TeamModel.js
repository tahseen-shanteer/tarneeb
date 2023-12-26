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
        required: true,
    }
});

module.exports = TeamSchema;