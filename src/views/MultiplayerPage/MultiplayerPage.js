import "./MultiplayerPage.css";
import React from "react";
import { Card, Form, Button } from "react-bootstrap";

function MultiplayerPage() {
  return (
    <div className="multiplayerPage-container">
      <h1 className="multiplayerPage-title">TARNEEB</h1>
      <div className="enterCode">
        <Card className="enterCode-card">
          <Card.Body className="code-card-body">
            <Card.Title className="enterCode-title">Enter code</Card.Title>
            <Form className="code-form">
              <Form.Group className="formName">
                <Form.Label className="name-label">Name:</Form.Label>
                <Form.Control
                  className="name-input"
                  type="text"
                  placeholder="Enter your name"
                />
              </Form.Group>

              <Form.Group className="formCode">
                <Form.Label className="code-label">Code:</Form.Label>
                <Form.Control
                  className="code-input"
                  type="text"
                  placeholder="Enter the code"
                />
              </Form.Group>

              <div className="submit-button">
                <Button
                  className="code-submit-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
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
