import "./Game.css";
import PlayingCard from "../../Components/PlayingCard/PlayingCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApp } from "../../state/slices/lobbySlice";

function Game() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const {lobbyCode, playerName} = useSelector(selectApp);
  const [pDeck, setPDeck] = useState([]);

  console.log("lobby code", lobbyCode);

  useEffect(() => {
    let thisPlayerDeck = [];
    async function fetchData() {
      try {
        // get initial deck of 52
        const initialDeckResponse = await fetch(
          `http://localhost:8000/api/lobbies/${lobbyCode}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const initialDeckJson = await initialDeckResponse.json();
        const initialDeck = initialDeckJson[0].lobbyDeck;
  
        // get players array
        const playerDeckResponse = await fetch(
          `http://localhost:8000/api/lobbies/${lobbyCode}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const playersjson = await playerDeckResponse.json();
        const players = playersjson[0].players; 


        const updatedPlayers = players.map((player, index) => {
          const playerDeckSlice = initialDeck.slice(index * 13, (index + 1) * 13);
          return { ...player, playerDeck: playerDeckSlice };
        });

        const patchResponse = await fetch(
          `http://localhost:8000/api/lobbies/${lobbyCode}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ players: updatedPlayers }),
          }
        );

        for(let i = 0; i < updatedPlayers.length; i++){
          if(updatedPlayers[i].playerName === playerName){
             thisPlayerDeck = updatedPlayers[i].playerDeck;
          }
        }
        console.log("this player deck : ",thisPlayerDeck);
      } catch (error) {
        console.error(error);
      }

      const playerDeck = [];
      for(let i = 0; i < 13; i++){
        const card = {
          number: thisPlayerDeck[i].value,
          shape: thisPlayerDeck[i].shape,
          isUp: false,
        };
        playerDeck.push(card);
      }
      console.log(playerDeck)
      setPDeck(playerDeck);
    }

    fetchData();
  }, []);
  

  return (
    <div className="game-container">
      <div className="game-table">
      </div>
      <div className="player-deck">
      {pDeck.map((card, index) => (
          <PlayingCard
            key={index}
            number={card.number}
            shape={card.shape}
            isUp={false}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;