import React, { useState } from "react";
import "./HostMediatorRoom.css";
import { Card, Button, Form, Image } from "react-bootstrap";
import DefaultProfile from "../../images/defaultProfile.svg";
import AvatarSelectionCard from "../../Components/AvatarSelectionCard/AvatarSelectionCard";
import { Link, useNavigate } from "react-router-dom";

// import them
import { useSelector, useDispatch } from "react-redux";
import { setLobbyCode, setPlayerName, selectApp } from "../../state/slices/lobbySlice";
import socket from '../../socket';


function HostMediatorRoom() {
  const dispatch = useDispatch(); // used to set stuff
  const { lobbyCode, thisPlayer, lobbyData } = useSelector(selectApp); // ngl dk what this is for but I saw it everywhere so just keep it incase

  const [avatar, setAvatar] = useState(DefaultProfile);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleAvatarChange = (avatar) => {
    setAvatar(avatar);
  };

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let code = "";
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const createPlayer = async () => {

    dispatch(setPlayerName(name));
    console.log(name);
    const response = await fetch('http://localhost:8000/api/players/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        playerName: name,
        playerAvatar: 'avatar',
        roundsWon: 0,
        isTurn: true,
        playerDeck: [],
      }
    )});

    const data = await response.json();
    console.log(data)

    return data;
  }

  const createRoom = async () =>{

    const gameCode = generateRandomCode();

    dispatch(setLobbyCode(gameCode));

    const response = await fetch('http://localhost:8000/api/lobbies/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        players: [await createPlayer()],
        lobbyCode: gameCode,
        lobbyDeck: [],
        team1: [],
        team2: [],
      })
    });
    const data = await response.json();
    console.log(data);

    const roomName = data.lobbyCode;
    socket.emit('createRoom', roomName );
    navigate(`/WaitingRoom?${roomName}`);
  };

  return (
    <div className="host-med-room-page-container">
      <div className="host-med-room-container">
        <Card className="host-med-room-card">
          <Card.Body className="host-med-room-card-body">
            <Card.Title className="host-med-room-card-title">
              Create Profile
            </Card.Title>
            <Form className="host-med-room-form">
              <Form.Group className="host-med-room-form-sprite-group">
                <Form.Label className="host-med-room-form-sprite-label">
                  Avatar:
                </Form.Label>
                <div className="host-med-room-avatar-form-container">
                  <div className="host-med-room-avatar-container">
                    <Image
                      src={avatar}
                      className="host-med-room-form-avatar-svg"
                    />
                  </div>
                  <AvatarSelectionCard
                    avatar={avatar}
                    handleAvatarChange={handleAvatarChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="host-med-room-form-name-group">
                <Form.Label className="host-med-room-form-name-label">
                  Display Name:
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Display Name"
                  className="host-med-room-form-name-field"
                  name={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
            </Form>
              <Button className="host-med-room-create-button" variant="danger" onClick={createRoom}>Create Game</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HostMediatorRoom;
