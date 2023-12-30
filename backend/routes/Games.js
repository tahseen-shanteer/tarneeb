const express = require("express");

const {
  getGame,
  createGame,
  deleteGame,
  updateGame,
} = require("../Controllers/GameController");

const router = express.Router();

// GET all Cards
router.get("/:id", getGame);

router.post("/", createGame);

// DELETE a Card
router.delete("/:id", deleteGame);

// UPDATE a Card
router.patch("/:id", updateGame);

module.exports = router;
