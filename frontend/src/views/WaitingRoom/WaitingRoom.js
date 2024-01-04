import React, { useEffect, useState } from "react";
import "./WaitingRoom.css";
import { Button, Card, Table, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import socket from "../../socket";

function WaitingRoom(props) {
  const role = "host";
  const gameCode = props.gameCode;
  console.log("GameCode", gameCode);

  useEffect(() => {
    if (gameCode) {
      fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('This is response from lobby get', json);
          props.setLobbyData(json);
          console.log('This is lobby data', props.lobbyData[0])
        });
    }
  }, [gameCode]);

  const alertFunc = () => {
    socket.emit("teamJoin", gameCode);
  };

  const func = (code) => {
    socket.emit("teamJoin", code);
  };

  const handleJoinTeam1 = async () => {
    const updatedTeam1 = props.lobbyData[0].team1;
    console.log('updateed team 1', updatedTeam1);
    const team2 = props.lobbyData[0].team2;

    if (updatedTeam1 &&updatedTeam1.includes(props.thisPlayer)) {
      console.error("Player already in team 1");
      return;
    } else if (team2 && team2.includes(props.thisPlayer)) {
      const index = team2.indexOf(props.thisPlayer);
      team2.splice(index, 1);
    }

    updatedTeam1.push(props.thisPlayer);

    await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...props.lobbyData[0],
        team1: updatedTeam1,
        team2: team2,
      }),
    })
      .then((response) => response.json())
      .then((json) => props.setLobbyData(json))
      .catch((error) => console.log(error));
  };

  return (
    <div className="waitingroom-page-container">
      <div className="waitingroom-container">
        <div className="waitingroom">
          {role === "host" && props.lobbyData[0] ? (
            <Card className="waitingroom-card">
              <Card.Body className="waitingroom-card-body">
                <div className="waitingroom-game-code">
                  <Card.Text className="waitingroom-card-code-text">
                    Game Code:
                  </Card.Text>
                  <Card.Text className="waitingroom-card-code">
                    {props.lobbyData[0].lobbyCode}
                  </Card.Text>
                </div>

                <Card.Text className="waitingroom-card-text">
                  Share this code with your friends to join the game!
                </Card.Text>
                <div className="waitingroom-table-container">
                  <Table
                    striped
                    bordered
                    hover
                    className="waitingroom-player-table"
                  >
                    <thead>
                      <tr>
                        <td>
                          <Button variant="secondary" onClick={handleJoinTeam1}>
                            Join Team 1
                          </Button>
                        </td>
                      </tr>
                    </thead>
                    {props.lobbyData[0].team1 && props.lobbyData[0].team1.length > 0 ? (
                      <tbody>
                        <tr>
                          <td>{props.lobbyData[0].team1[0].playerName}</td>
                        </tr>
                        <tr>
                          <td>
                            {props.lobbyData[0].team1.length > 1
                              ? props.lobbyData[0].team1[1].playerName
                              : "Player"}
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td>Player</td>
                        </tr>
                        <tr>
                          <td>Player</td>
                        </tr>
                      </tbody>
                    )}
                  </Table>
                  <Table
                    striped
                    bordered
                    hover
                    className="waitingroom-player-table"
                  >
                    <thead>
                      <tr>
                        <td>
                          <Button variant="secondary">Join Team 2</Button>
                        </td>
                      </tr>
                    </thead>
                    {props.lobbyData[0].team2 && props.lobbyData[0].team2.length > 0 ? (
                      <tbody>
                        <tr>
                          <td>{props.lobbyData[0].team2[0].playerName}</td>
                        </tr>
                        <tr>
                          <td>
                            {props.lobbyData[0].team2.length > 1
                              ? props.lobbyData[0].team2[1].playerName
                              : "Player"}
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      <tbody>
                        <tr>
                          <td>Player</td>
                        </tr>
                        <tr>
                          <td>Player</td>
                        </tr>
                      </tbody>
                    )}
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
