import React, { useState } from 'react';
import "./WaitingRoom.css";
import { Button, Card, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import socket from '../../socket';



function WaitingRoom() {
  const role = "host";
  const codes = "ABC123"
  const [code, setCode] = useState('');

  const alertFunc = () => {
    socket.emit("teamJoin", codes);
  };

  const func = (code) => {
    socket.emit("teamJoin", code);
  };

  return (
    <div className="waitingroom-page-container">
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
                <div className="waitingroom-table-container">
                  <Table striped bordered hover className="waitingroom-player-table">
                    <thead>
                      <tr>
                        <td><Button variant="secondary" onClick={alertFunc}>Join Team 1</Button></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Player</td>
                      </tr>
                      <tr>
                        <td>Player</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Table striped bordered hover className="waitingroom-player-table">
                    <thead>
                      <tr>
                        <td><Button variant="secondary">Join Team 2</Button></td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Player</td>
                      </tr>
                      <tr>
                        <td>Player</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="waitingroom-host-buttons">
                  <Link to="/">
                    <Button
                      className="waitingroom-host-button-leave"
                      variant="danger"
                    >
                      Leave Game
                    </Button>
                  </Link>
                  <Link to="/Game">
                    <Button
                      className="waitingroom-host-button-start"
                      variant="success"
                    >
                      Start Game
                    </Button>
                  </Link>
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
