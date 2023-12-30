const Round = require("../models/RoundModel");
const mongoose = require("mongoose");

const getRounds = async (req, res) => {
  const rounds = await Round.find({});

  res.status(200).json(rounds);
};

const getRound = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such round" });
  }

  const round = await Round.findById(id);

  if (!round) {
    return res.status(404).json({ error: "No such round" });
  }

  res.status(200).json(round);
};

const createRound = async (req, res) => {
  const { roundNumber, cardsPlayed } = req.body;

  let emptyFields = [];

  if (!roundNumber) {
    emptyFields.push("roundNumber");
  }
  if (!cardsPlayed) {
    emptyFields.push("cardPlayed");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const round = await Round.create({ roundNumber, cardsPlayed });
    res.status(200).json(round);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a workout
const deleteRound = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such round" });
  }

  const round = await Round.findOneAndDelete({ _id: id });

  if (!round) {
    return res.status(400).json({ error: "No such round" });
  }

  res.status(200).json(round);
};

// update a workout
const updateRound = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such round" });
  }

  const round = await Round.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!round) {
    return res.status(400).json({ error: "No such round" });
  }

  res.status(200).json(round);
};

module.exports = {
  getRounds,
  getRound,
  createRound,
  deleteRound,
  updateRound,
};