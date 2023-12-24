import "./MultiplayerPage.css";
import React, { useState } from "react";
import { Card, Form, Button, Image } from "react-bootstrap";
import DefaultProfile from "../../images/defaultProfile.svg";
import AvatarSelectionCard from "../../Components/AvatarSelectionCard/AvatarSelectionCard";

function MultiplayerPage() {
  const [avatar, setAvatar] = useState(DefaultProfile);

  const handleAvatarChange = (avatar) => {
    setAvatar(avatar);
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
                />
              </Form.Group>

              <Form.Group className="formCode">
                <Form.Label className="code-label">Code:</Form.Label>
                <Form.Control
                  className="code-input"
                  type="text"
                  placeholder="Enter game code"
                />
              </Form.Group>

              <div className="submit-button">
                <Button
                  className="code-submit-button"
                  variant="danger"
                  type="submit"
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
