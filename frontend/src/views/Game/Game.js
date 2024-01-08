import "./Game.css";
import PlayingCard from "../../Components/PlayingCard/PlayingCard";
import BiddingCard from "../../Components/BiddingCard/BiddingCard";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectApp } from "../../state/slices/lobbySlice";
import socket from "../../socket";

function Game() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);
  const {lobbyCode, playerName} = useSelector(selectApp);
  const [pDeck, setPDeck] = useState([]);
  const [currentBidAmount, setCurrentBidAmount] = useState(0);
  const [bidderName, setBidderName] = useState("Jane Doe");
  const [showBiddingModal, setShowBiddingModal] = useState(true);
  const [maxBidReached, setMaxBidReached ] = useState(false);
  const [consecutivePasses, setConsecutivePasses] = useState(0);
  const [isTurn, setIsTurn] = useState(false);
  const [bidTurnArray, setBidTurnArray] = useState([]);
  const [bidTurnIndex, setBidTurnIndex] = useState(0);

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

  useEffect(() =>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/lobbies/${lobbyCode}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
  
        const json = await response.json();
        const team1 = json[0].team1;
        const team2 = json[0].team2;

        setBidTurnArray([team1[0], team2[0], team1[1], team2[1]])

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);


  //when bit turn array is defined, execute this useEffect to determine the bidding turn of a player
  //dependent on the change of the bid turn index and the initialization of the bid turn array
  useEffect(() => {
    if(bidTurnArray.length > 0){
      if (playerName === bidTurnArray[bidTurnIndex].playerName) {
        setIsTurn(true);
      } else {
        setIsTurn(false);
      }
    }
  }, [bidTurnIndex, bidTurnArray])

  useEffect(() =>{
    if(currentBidAmount === 13 || consecutivePasses === 3){
      showBiddingModal = false;
    }
  }, [currentBidAmount, consecutivePasses]);

  const handleCloseBiddingModal = () => {
    setShowBiddingModal(false);
  };

  // update highest bid for this player
  const handleBid = (bid) => {
    setCurrentBidAmount(bid);
    setConsecutivePasses(0);
    socket.emit("bidPlaced", lobbyCode, bid, playerName);
  };

  // update highest bid for everyone and restore passes to 0
  socket.on("newBid", (bid, name) =>{
    setBidTurnIndex((bidTurnIndex + 1) % 4)
    setCurrentBidAmount(bid);
    setBidderName(name);
    setConsecutivePasses(0);
  });

  // update passes for this player
  const handlePass = () => {
    setConsecutivePasses(consecutivePasses + 1);
    socket.emit("passOccured", lobbyCode)
  };

  // update consecutive passes for everyone
  socket.on("passIncrement", () =>{
    setBidTurnIndex((bidTurnIndex + 1) % 4);
    setConsecutivePasses(consecutivePasses + 1);
  });
  

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
      <div className="bid-button-container">
          <BiddingCard
            currentBidAmount={currentBidAmount}
            bidderName={bidderName}
            onBid={handleBid}
            onClose={handleCloseBiddingModal}
            onPass={handlePass}
            isTurn={isTurn}
            setIsTurn={setIsTurn}
          />
      </div>
    </div>
  );
}


export default Game;