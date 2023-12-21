import React from "react";
import "./Homepage.css";
import { Button, Card } from "react-bootstrap";

function Homepage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">TARNEEB</h1>
      <div className="game-options-container">
        <div className="game-option">
          <Card className="game-option-card">
            <Card.Body className="game-option-card-body">
              <Card.Title className="game-option-card-title">
                Multiplayer
              </Card.Title>
              <Card.Text className="game-option-card-text">
                Create a game for your friends to join or join a friend's game!
              </Card.Text>
              <div className="multiplayer-buttons">
                <Button className="game-option-button">Create Game</Button>
                <Button className="game-option-button">Join Game</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="game-option">
          <Card className="game-option-card">
            <Card.Body className="game-option-card-body">
              <Card.Title className="game-option-card-title">
                Single Player
              </Card.Title>
              <Card.Text className="game-option-card-text">
                Improve your skill by playing against trained bots!
              </Card.Text>
              <div className="single-player-button">
                <Button className="game-option-button">Play Alone</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
