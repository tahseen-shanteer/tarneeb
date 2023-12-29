const express = require("express");

const {
  getGame,
  createGame,
  deleteGame,
  updateGame,
} = require("../Controllers/GameController");

const router = express.Router();

// GET all Cards
router.get("/", getGame);

// GET a single Card
router.get("/:id", createGame);

// DELETE a Card
router.delete("/:id", deleteGame);

// UPDATE a Card
router.patch("/:id", updateGame);

module.exports = router;
