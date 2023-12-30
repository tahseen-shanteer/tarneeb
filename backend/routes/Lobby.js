const express = require("express");

const {
  getLobby,
  createLobby,
  deleteLobby,
  updateLobby,
} = require("../Controllers/LobbyController");

const router = express.Router();

// GET a single Lobby
router.get("/:id", getLobby);

// POST a new Lobby
router.post("/", createLobby);

// DELETE a Lobby
router.delete("/:id", deleteLobby);

// UPDATE a Lobby
router.patch("/:id", updateLobby);

module.exports = router;
