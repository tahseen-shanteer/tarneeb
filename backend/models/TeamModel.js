const mongoose = require('mongoose');

const PlayerSchema = require('./PlayerModel').schema;

const TeamSchema = new mongoose.Schema({

    teamPlayers:{ 
        type: [PlayerSchema],
        validate: {
            validator: function (teamPlayers) {
                return teamPlayers.length <= 2;
            },
            message: 'A team cannot have more than 2 players',
        },
        required: true,
    },

    roundsWon:{
        type: Number,
        default: 0,
        required: true,
    }
});

module.exports = mongoose.model('Team', TeamSchema);