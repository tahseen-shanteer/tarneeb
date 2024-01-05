import "./MultiplayerPage.css";
import React, { useState, useEffect } from "react";
import { Card, Form, Button, Image } from "react-bootstrap";
import DefaultProfile from "../../images/defaultProfile.svg";
import AvatarSelectionCard from "../../Components/AvatarSelectionCard/AvatarSelectionCard";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { selectApp, setLobbyCode, setPlayerName } from "../../state/slices/lobbySlice";
import socket from '../../socket';

function MultiplayerPage() {
  const [avatar, setAvatar] = useState(DefaultProfile);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const { lobbyCode, thisPlayer } = useSelector(selectApp);
  const navigate = useNavigate();

  const handleAvatarChange = (avatar) => {
    setAvatar(avatar);
  };

  const joinGame = (gameCode, playerName) => {
    socket.emit('joinRoom', playerName, gameCode);
    dispatch(setLobbyCode(gameCode));
    dispatch(setPlayerName(playerName));
    const roomName = gameCode;
    navigate(`/WaitingRoom?${roomName}`);
  };

  return (
    <div className="multiplayerPage-container">
      <div className="enterCode">
        <Card className="enterCode-card">
          <Card.Body className="code-card-body">
            <Card.Title className="enterCode-title">Enter code</Card.Title>
            <Form className="code-form">
              <Form.Group className="avatarSelection">
                <Form.Label className="avatar-label">Avatar:</Form.Label>
                <div className="avatar-form-container">
                  <div className="avatar-container">
                    <Image src={avatar} className="avatar-svg" />
                  </div>
                  <AvatarSelectionCard
                    avatar={avatar}
                    handleAvatarChange={handleAvatarChange}
                  />
                </div>
              </Form.Group>
              <Form.Group className="formName">
                <Form.Label className="name-label">Name:</Form.Label>
                <Form.Control
                  className="name-input"
                  type="text"
                  placeholder="Enter display Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="formCode">
                <Form.Label className="code-label">Code:</Form.Label>
                <Form.Control
                  className="code-input"
                  type="text"
                  placeholder="Enter game code"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Form.Group>

              <div className="submit-button">
                <Button
                  className="code-submit-button"
                  variant="danger"
                  type="button"
                  onClick={() => joinGame(code, name)}
                >
                  Join Game
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
export default MultiplayerPage;