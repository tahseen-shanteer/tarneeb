const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    value:{
        type: String,
        required: true,
    },

    shape:{
        type: String,
        required: true,
    }
});

module.exports = CardSchema;