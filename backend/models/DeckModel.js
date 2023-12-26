const mongoose = require("mongoose");

const CardSchema = reqiure('./CardModel');

const DeckSchema = new mongoose.Schema({
    cardDeck : {
        type: [CardSchema],
        required: true,
    }
});

module.exports = DeckSchema;