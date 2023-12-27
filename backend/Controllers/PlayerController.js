const Player = require("../models/PlayerModel");
const mongoose = require("mongoose");

const getPlayers = async (req, res) => {
  const cards = await Card.find({});

  res.status(200).json(cards);
};

const getPlayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such player" });
  }

  const player = await Player.findById(id);

  if (!player) {
    return res.status(404).json({ error: "No such player" });
  }

  res.status(200).json(player);
};

const createPlayer = async (req, res) => {
  const { playerName, playerAvatar, roundsWon, isTurn, playerDeck } = req.body;

  let emptyFields = [];

  if (!playerName) {
    emptyFields.push("playerName");
  }
  if (!playerAvatar) {
    emptyFields.push("playerAvater");
  }
  if (!playerDeck) {
    emptyFields.push("playerDeck");
  }
  if (!roundsWon) {
    emptyFields.push("roundsWon");
  }
  if (!isTurn) {
    emptyFields.push("isTurn");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const player = await Player.create({ playerName, playerAvatar, roundsWon, isTurn, playerDeck });
    res.status(200).json(player);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such card" });
  }

  const card = await Card.findOneAndDelete({ _id: id });

  if (!card) {
    return res.status(400).json({ error: "No such card" });
  }

  res.status(200).json(card);
};

// update a workout
const updateCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such card" });
  }

  const card = await Card.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!card) {
    return res.status(400).json({ error: "No such card" });
  }

  res.status(200).json(card);
};

module.exports = {
  getCards,
  getCard,
  createCard,
  deleteCard,
  updateCard,
};
