const express = require("express");

const {
  getPlayers,
  getPlayer,
  createPlayer,
  deletePlayer,
  updatePlayer,
} = require("../Controllers/PlayerController");

const router = express.Router();

// GET all Cards
router.get("/", getPlayers);

// GET a single Card
router.get("/:id", getPlayer);

// POST a new Card
router.post("/", createPlayer);

// DELETE a Card
router.delete("/:id", deletePlayer);

// UPDATE a Card
router.patch("/:id", updatePlayer);

module.exports = router;
