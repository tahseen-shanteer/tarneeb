const Game = require("../models/GameModel");
const mongoose = require("mongoose");

const getGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such game" });
  }

  const game = await Game.findById(id);

  if (!game) {
    return res.status(404).json({ error: "No such game" });
  }

  res.status(200).json(game);
};

const createGame = async (req, res) => {
  const { lobbyID, team1, team2, gameWinner, rounds } = req.body;

  let emptyFields = [];

  if (!lobbyID) {
    emptyFields.push("lobbyID");
  }
  if (!gameWinner) {
    emptyFields.push("gameWinner");
  }
  if (!rounds) {
    emptyFields.push("rounds");
  }
  if (!team1) {
    emptyFields.push("team1");
  }
  if (!team2) {
    emptyFields.push("team2");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const game = await Game.create({ lobbyID, team1, team2, gameWinner, rounds });
    res.status(200).json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such game" });
  }

  const game = await Game.findOneAndDelete({ _id: id });

  if (!game) {
    return res.status(400).json({ error: "No such game" });
  }

  res.status(200).json(game);
};

// update a workout
const updateGame = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such game" });
  }

  const game = await Game.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!game) {
    return res.status(400).json({ error: "No such game" });
  }

  res.status(200).json(game);
};

module.exports = {
  getGame,
  createGame,
  deleteGame,
  updateGame,
};
