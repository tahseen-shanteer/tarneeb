const express = require("express");

const {
  getTeam,
  createTeam,
  deleteTeam,
  updateTeam,
} = require("../Controllers/TeamController");

const router = express.Router();

// GET all Cards
router.get("/", getTeam);

// GET a single Card
router.get("/:id", createTeam);

// DELETE a Card
router.delete("/:id", deleteTeam);

// UPDATE a Card
router.patch("/:id", updateTeam);

module.exports = router;
