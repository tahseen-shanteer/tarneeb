const Lobby = require("../models/LobbyModel");
const mongoose = require("mongoose");

const getLobby = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such lobby" });
  }

  const lobby = await Lobby.findById(id);

  if (!lobby) {
    return res.status(404).json({ error: "No such lobby" });
  }

  res.status(200).json(lobby);
};

const createLobby = async (req, res) => {
  const { players, lobbyDeck, lobbyCode, team1, team2 } = req.body;

  let emptyFields = [];

  if (!players) {
    emptyFields.push("players");
  }
  if (!lobbyDeck) {
    emptyFields.push("lobbyDeck");
  }
  if (!lobbyCode) {
    emptyFields.push("lobbyCode");
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
    const lobby = await Lobby.create({ players, lobbyDeck, lobbyCode, team1, team2 });
    res.status(200).json(lobby);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteLobby = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such lobby" });
  }

  const lobby = await Lobby.findOneAndDelete({ _id: id });

  if (!lobby) {
    return res.status(400).json({ error: "No such lobby" });
  }

  res.status(200).json(lobby);
};

// update a workout
const updateLobby = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such lobby" });
  }

  const lobby = await Lobby.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!lobby) {
    return res.status(400).json({ error: "No such lobby" });
  }

  res.status(200).json(lobby);
};

module.exports = {
  getLobby,
  createLobby,
  deleteLobby,
  updateLobby,
};
