import "./Game.css";
import PlayingCard from "../../Components/PlayingCard/PlayingCard";
import React, { useState } from "react";

function Game() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [playedCards, setPlayedCards] = useState([]);

  const getRandomShape = () => {
    const shapes = ["heart", "diamond", "club", "spade"];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const getRandomNumber = () => {
    const numbers = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    return numbers[Math.floor(Math.random() * numbers.length)];
  };

  const generateRandomCards = () => {
    const randomCards = [];
    for (let i = 0; i < 13; i++) {
      const card = {
        number: getRandomNumber(),
        shape: getRandomShape(),
        isUp: false,
      };
      randomCards.push(card);
      localStorage.setItem("card" + (i + 1), card.number + " " + card.shape);
    }
    return randomCards;
  };

  const randomCards = generateRandomCards();

  const handleCardClick = (index) => {
    setSelectedCard((prevIndex) => {
      if (index === prevIndex) {
        if (!randomCards[index].isPlayed) {
          setPlayedCards([randomCards[index]]);
          randomCards[index].isPlayed = true;
        }
        return null;
      } else {
        return index;
      }
    });
  };

  return (
    <div className="game-container">
      <div className="game-table">
        <div className="played-card">
          {playedCards.map((card, index) => (
            <PlayingCard key={index} number={card.number} shape={card.shape} />
          ))}
        </div>
      </div>
      <div className="player-deck">
        {randomCards.map((card, index) => (
          <PlayingCard
            key={index}
            number={card.number}
            shape={card.shape}
            onClick={() => handleCardClick(index)}
            isUp={selectedCard === index}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
