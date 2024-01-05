import React, { useState, useEffect } from "react";
import "./WaitingRoom.css";
import { Button, Card, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectApp } from "../../state/slices/lobbySlice";
import socket from "../../socket";

function WaitingRoom() {
  const dispatch = useDispatch();
  const { lobbyCode, thisPlayer } = useSelector(selectApp);
  const [Team1, setTeam1] = useState(null);
  const [Player, setPlayer] = useState(null);
  const [Player11, setPlayer11] = useState("Player");
  const [Player12, setPlayer12] = useState("Player");
  const [Player21, setPlayer21] = useState("Player");
  const [Player22, setPlayer22] = useState("Player");
  const role = "host";
  const gameCode = lobbyCode;
  const playerName = thisPlayer;

  useEffect(() => {
    
    // get team 1 array
    if (gameCode) {
      fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('This is response from lobby get', json);
          console.log('This is lobby data', json);
          setTeam1(json[0].team1);
        });
    }
  }, [gameCode]);

  const alertFunc = () => {
    socket.emit("teamJoin", gameCode);
  };

  const handleTeamJoin = async () => {
    let json;

    // get player from lobby in db based off their name
    const response = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    json = await response.json();
    console.log(json);

    const fetchedPlayer = json[0].players[0];
    setPlayer(fetchedPlayer);
    console.log(Player);

    // if Team1 is null or empty
    if (!Team1 || Team1.length === 0) {
        // update Team1 array in db
        console.log(fetchedPlayer);
        setPlayer11(fetchedPlayer.playerName);
        console.log(Player11);
        const updatedLobby = {
            ...json[0],
            team1: [fetchedPlayer],
        };

        const updateResponse = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedLobby),
        });

        const updateJsonData = await updateResponse.json();
        console.log('This is response from lobby update', updateJsonData);
        console.log('a player joined Team1');
    } else if (Team1.length === 1) {
        // update Team1 array in db
        console.log(fetchedPlayer);
        setPlayer12(fetchedPlayer.playerName);
        console.log(Player11);
        const updatedLobby = {
            ...json[0],
            team1: [fetchedPlayer],
        };

        const updateResponse = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedLobby),
        });

        const updateJsonData = await updateResponse.json();
        console.log('This is response from lobby update', updateJsonData);
        console.log('a player joined Team1');
    }
};

  

  return (
    <div className="waitingroom-page-container">
      <div className="waitingroom-container">
        <div className="waitingroom">
            <Card className="waitingroom-card">
              <Card.Body className="waitingroom-card-body">
                <div className="waitingroom-game-code">
                  <Card.Text className="waitingroom-card-code-text">
                    Game Code:
                  </Card.Text>
                  <Card.Text className="waitingroom-card-code">
                    {gameCode}
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
                          <Button variant="secondary" onClick={handleTeamJoin}>
                            Join Team 1
                          </Button>
                        </td>
                      </tr>
                    </thead>
                      <tbody>
                        <tr>
                          <td>{Player11}</td>
                        </tr>
                        <tr>
                          <td>{Player12}</td>
                        </tr>
                      </tbody>
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
                      <tbody>
                        <tr>
                          <td>{Player21}</td>
                        </tr>
                        <tr>
                          <td>{Player22}</td>
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
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
