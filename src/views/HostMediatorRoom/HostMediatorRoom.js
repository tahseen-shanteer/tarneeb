import React from "react";
import "./HostMediatorRoom.css";
import { Card, Button, Form } from "react-bootstrap";

function HostMediatorRoom() {
  return (
    <div className="host-med-room-page-container">
      <h1 className="host-med-room-title">TARNEEB</h1>
      <div className="host-med-room-container">
        <Card className="host-med-room-card">
          <Card.Body className="host-med-room-card-body">
            <Card.Title className="host-med-room-card-title">
              Create Profile
            </Card.Title>
            <Form className="host-med-room-form">
              <Form.Group className="host-med-room-form-sprite-group">
                <Form.Label className="host-med-room-form-sprite-label">
                  Profile Sprite:
                </Form.Label>
                <Form.Select
                  className="host-med-room-form-sprite-file-input"
                />
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
            <Button className="host-med-room-create-button">Create Game</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default HostMediatorRoom;
