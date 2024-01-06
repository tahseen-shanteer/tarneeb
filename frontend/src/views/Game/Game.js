import "./Game.css";
import PlayingCard from "../../Components/PlayingCard/PlayingCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApp } from "../../state/slices/lobbySlice";

function Game() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const {lobbyCode, playerName} = useSelector(selectApp);
  const [playerDeck, setPlayerDeck] = useState([]);
  const [initialDeck, setInitialDeck] = useState([]);

  console.log("lobby code", lobbyCode);

  useEffect(() => {
    async function getInitialDeck() {
      try {
        const response = await fetch(
          `http://localhost:8000/api/lobbies/${lobbyCode}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const json = await response.json();
        console.log(json);
        setInitialDeck(json[0].lobbyDeck);
      } catch (error) {
        console.error(error);
      }
    }

    getInitialDeck();
  }, [initialDeck, lobbyCode]);

  useEffect(() => {
    if (initialDeck) {
      async function handoutPlayerDeck() {
        const lobbyData = await fetch(
          `http://localhost:8000/api/lobbies/${lobbyCode}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const players = await lobbyData.json()[0].players;
        console.log("players array", players);

        let thisPlayerId;
        let thisPlayerIndex;

        for (let index = 0; index < players.length; index++) {
          if (players[index].playerName === playerName) {
            thisPlayerId = players[index]._id;
            thisPlayerIndex = index;
            break;
          }
        }

        if (thisPlayerId) {
          await fetch(`http://localhost:8000/api/players/${thisPlayerId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...players[thisPlayerIndex],
              playerDeck: initialDeck.slice(
                13 * thisPlayerIndex,
                13 * thisPlayerIndex + 13
              ),
            }),
          })
            .then((response) => response.json())
            .then((json) => {
              console.log(json);
              setPlayerDeck(json[0].playerDeck);
            });
        }
      }

      handoutPlayerDeck();
    }
  }, [initialDeck, lobbyCode, playerName]);

  return (
    <div className="game-container">
      <div className="game-table">
        <div className="played-card"></div>
      </div>
      <div className="player-deck">
      </div>
    </div>
  );
}

export default Game;