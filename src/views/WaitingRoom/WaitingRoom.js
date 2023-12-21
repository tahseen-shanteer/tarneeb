import React from "react";
import "./WaitingRoom.css";
import { Button, Card, Table } from "react-bootstrap";

function WaitingRoom() {
  const role = "host";

  return (
    <div className="waitingroom-page-container">
      <h1 className="waitingroom-title">TARNEEB</h1>
      <div className="waitingroom-container">
        <div className="waitingroom">
          {role === "host" ? (
            <Card className="waitingroom-card">
              <Card.Body className="waitingroom-card-body">
                <div className="waitingroom-game-code">
                  <Card.Text className="waitingroom-card-code-text">
                    Game Code:
                  </Card.Text>
                  <Card.Text className="waitingroom-card-code">
                    ABC123
                  </Card.Text>
                </div>

                <Card.Text className="waitingroom-card-text">
                  Share this code with your friends to join the game!
                </Card.Text>
                <Table className="waitingroom-player-table">
                  <thead>
                    <tr>
                      <th>Player</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Player 1</td>
                    </tr>
                    <tr>
                      <td>Player 2</td>
                    </tr>
                    <tr>
                      <td>Player 3</td>
                    </tr>
                    <tr>
                      <td>Player 4</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="waitingroom-host-buttons">
                  <Button className="waitingroom-host-button">
                    Leave Game
                  </Button>
                  <Button className="waitingroom-host-button">
                    Start Game
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
