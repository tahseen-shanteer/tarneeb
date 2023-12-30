const Team = require("../models/TeamModel");
const mongoose = require("mongoose");

const getTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such team" });
  }

  const team = await Team.findById(id);

  if (!team) {
    return res.status(404).json({ error: "No such team" });
  }

  res.status(200).json(team);
};

const createTeam = async (req, res) => {
  const { teamPlayers, roundsWon } = req.body;

  let emptyFields = [];

  if (!teamPlayers) {
    emptyFields.push("teamPlayers");
  }
  if (!roundsWon) {
    emptyFields.push("roundsWon");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const team = await Team.create({ value, shape });
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such team" });
  }

  const team = await Team.findOneAndDelete({ _id: id });

  if (!team) {
    return res.status(400).json({ error: "No such team" });
  }

  res.status(200).json(team);
};

// update a workout
const updateTeam = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such team" });
  }

  const team = await Team.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!team) {
    return res.status(400).json({ error: "No such team" });
  }

  res.status(200).json(team);
};

module.exports = {
  getTeam,
  createTeam,
  deleteTeam,
  updateTeam,
};
