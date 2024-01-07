import React, { useState, useEffect } from "react";
import "./WaitingRoom.css";
import { Button, Card, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectApp } from "../../state/slices/lobbySlice";
import socket from "../../socket";

function WaitingRoom() {
  const dispatch = useDispatch();
  const { lobbyCode, playerName } = useSelector(selectApp);
  const [Team1, setTeam1] = useState([]);
  const [Team2, setTeam2] = useState([]);
  const [Player, setPlayer] = useState(null);
  const [Player11, setPlayer11] = useState("Player");
  const [Player12, setPlayer12] = useState("Player");
  const [Player21, setPlayer21] = useState("Player");
  const [Player22, setPlayer22] = useState("Player");
  const role = "host";
  const gameCode = lobbyCode;
  const RplayerName = playerName;
  const navigate = useNavigate();

  socket.on('team1Joined', () => {
    // get team 1 array
    if (gameCode) {
      fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => {
          setTeam1(json[0].team1);
          if(json[0].team1.length >= 1){
            setPlayer11(json[0].team1[0].playerName);
          }
          if(json[0].team1.length === 2){
            setPlayer12(json[0].team1[1].playerName);
          }
        });
    }
  });


  socket.on('team2Joined', () => {
    // get team 2 array
    if (gameCode) {
      fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((json) => {
          setTeam2(json[0].team2);
          if (json[0].team2.length >= 1) {
            setPlayer21(json[0].team2[0].playerName);
          }
          if (json[0].team2.length === 2) {
            setPlayer22(json[0].team2[1].playerName);
          }
        });
    }
  });


  const handleTeam1Join = async () => {
    let json;

    // get player from lobby in db based off their name
    const response = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    json = await response.json();
    let fetchedPlayer;
    for(let i = 0; i < json[0].players.length; i++){
      if(json[0].players[i].playerName === RplayerName){
        fetchedPlayer = json[0].players[i];
      }
    }
    setPlayer(fetchedPlayer);

    // if Team1 is empty
    if (Team1.length === 0) {
        // update Team1 array in db
        console.log(" team 1 array if there's 0 players in it : ", Team1);
        const updatedLobby = {
            ...json[0],
            team1: [...Team1, fetchedPlayer],
        };

        const updateResponse = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedLobby),
        });

        const updateJsonData = await updateResponse.json();
    } else if (Team1.length === 1) {
        // update Team1 array in db
        console.log(" team 1 array if there's already a player in it : ", Team1);
        const updatedLobby = {
            ...json[0],
            team1: [...Team1, fetchedPlayer],
        };

        const updateResponse = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedLobby),
        });

        const updateJsonData = await updateResponse.json();
    }

    // send signal to server that a player joined team 1
    socket.emit("team1Join", gameCode);
};

const handleTeam2Join = async () => {
  let json;

  // get player from lobby in db based off their name
  const response = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  json = await response.json();
  let fetchedPlayer;
  for (let i = 0; i < json[0].players.length; i++) {
    if (json[0].players[i].playerName === RplayerName) {
      fetchedPlayer = json[0].players[i];
    }
  }
  setPlayer(fetchedPlayer);

  // if Team2 is empty
  if (Team2.length === 0) {
    // update Team2 array in db
    console.log(" team 2 array if there's 0 players in it : ", Team2);
    const updatedLobby = {
      ...json[0],
      team2: [...Team2, fetchedPlayer],
    };

    const updateResponse = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLobby),
    });

    const updateJsonData = await updateResponse.json();
  } else if (Team2.length === 1) {
    // update Team2 array in db
    console.log(" team 2 array if there's already a player in it : ", Team2);
    const updatedLobby = {
      ...json[0],
      team2: [...Team2, fetchedPlayer],
    };

    const updateResponse = await fetch(`http://localhost:8000/api/lobbies/${gameCode}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedLobby),
    });

    const updateJsonData = await updateResponse.json();
  }

  // send signal to server that a player joined team 2
  socket.emit("team2Join", gameCode);
};

const handleStartGame = () =>{
    socket.emit('startingGame', gameCode);
    navigate(`/Game?${gameCode}`);
};

socket.on("gameStarted", (gameCode) =>{
  navigate(`/Game?${gameCode}`);
})

  

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
                          <Button variant="secondary" onClick={handleTeam1Join}>
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
                          <Button variant="secondary" onClick={handleTeam2Join}>Join Team 2</Button>
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
                    <Button
                      className="waitingroom-host-button-start"
                      variant="success"
                      onClick={handleStartGame}
                    >
                      Start Game
                    </Button>
                </div>
              </Card.Body>
            </Card>
        </div>
      </div>
    </div>
  );
}

export default WaitingRoom;
