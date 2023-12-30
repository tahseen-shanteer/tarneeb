const Card = require("../models/CardModel");
const mongoose = require("mongoose");

const getCards = async (req, res) => {
  const cards = await Card.find({});

  res.status(200).json(cards);
};

const getCard = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such card" });
  }

  const card = await Card.findById(id);

  if (!card) {
    return res.status(404).json({ error: "No such card" });
  }

  res.status(200).json(card);
};

const createCard = async (req, res) => {
  const { value, shape } = req.body;

  let emptyFields = [];

  if (!value) {
    emptyFields.push("value");
  }
  if (!shape) {
    emptyFields.push("shape");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const card = await Card.create({ value, shape });
    res.status(200).json(card);
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
