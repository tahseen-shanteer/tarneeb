const Player = require("../models/PlayerModel");
const mongoose = require("mongoose");

const getPlayers = async (req, res) => {
  const players = await Player.find({});

  res.status(200).json(players);
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
    emptyFields.push("playerAvatar");
  }
  if (!playerDeck) {
    emptyFields.push("playerDeck");
  }
  if (roundsWon === undefined) {
    emptyFields.push("roundsWon");
  }
  if (isTurn === undefined) {
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
const deletePlayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such player" });
  }

  const player = await Player.findOneAndDelete({ _id: id });

  if (!player) {
    return res.status(400).json({ error: "No such player" });
  }

  res.status(200).json(player);
};

// update a workout
const updatePlayer = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such player" });
  }

  const player = await Player.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!player) {
    return res.status(400).json({ error: "No such player" });
  }

  res.status(200).json(player);
};

module.exports = {
  getPlayers,
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
