import React, { useState } from "react";
import "./HostMediatorRoom.css";
import { Card, Button, Form, Image } from "react-bootstrap";
import DefaultProfile from "../../images/defaultProfile.svg";
import AvatarSelectionCard from "../../Components/AvatarSelectionCard/AvatarSelectionCard";
import { Link, useNavigate } from "react-router-dom";
import socket from '../../socket';


function HostMediatorRoom() {
  const [avatar, setAvatar] = useState(DefaultProfile);
  const navigate = useNavigate();

  const handleAvatarChange = (avatar) => {
    setAvatar(avatar);
  };

  const createRoom = () =>{
    const roomName = `ABC123`;
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
