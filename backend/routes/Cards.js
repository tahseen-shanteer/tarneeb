const express = require("express");

const {
  getCards,
  getCard,
  createCard,
  deleteCard,
  updateCard,
} = require("../Controllers/CardController");

const router = express.Router();

// GET all Cards
router.get("/", getCards);

// GET a single Card
router.get("/:id", getCard);

// POST a new Card
router.post("/", createCard);

// DELETE a Card
router.delete("/:id", deleteCard);

// UPDATE a Card
router.patch("/:id", updateCard);

module.exports = router;
