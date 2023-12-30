const express = require("express");

const {
  getRounds,
  getRound,
  createRound,
  deleteRound,
  updateRound,
} = require("../Controllers/RoundController");

const router = express.Router();

// GET all Cards
router.get("/", getRounds);

// GET a single Card
router.get("/:id", getRound);

// POST a new Card
router.post("/", createRound);

// DELETE a Card
router.delete("/:id", deleteRound);

// UPDATE a Card
router.patch("/:id", updateRound);

module.exports = router;
