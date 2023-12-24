import React, { useEffect, useState } from "react";
import "./AvatarSelectionCard.css";
import Avatar2 from "../../images/avatar2.svg";
import Avatar3 from "../../images/avatar3.svg";
import Avatar4 from "../../images/avatar4.svg";
import Avatar5 from "../../images/avatar5.svg";
import Avatar6 from "../../images/avatar6.svg";
import Avatar8 from "../../images/avatar8.svg";
import Avatar9 from "../../images/avatar9.svg";
import Avatar10 from "../../images/avatar10.svg";
import Avatar11 from "../../images/avatar11.svg";
import Avatar12 from "../../images/avatar12.svg";
import Avatar13 from "../../images/avatar13.svg";
import Avatar14 from "../../images/avatar14.svg";
import Avatar15 from "../../images/avatar15.svg";
import DefaultProfile from "../../images/defaultProfile.svg";
import { Modal, Image, Button } from "react-bootstrap";

function AvatarSelectionCard(props) {
  const avatars = [
    DefaultProfile,
    Avatar2,
    Avatar3,
    Avatar4,
    Avatar5,
    Avatar6,
    Avatar8,
    Avatar9,
    Avatar10,
    Avatar11,
    Avatar12,
    Avatar13,
    Avatar14,
    Avatar15,
  ];
  const [show, setShow] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(props.avatar);

  const handleClose = () => {
    setSelectedAvatar(props.avatar);
    setShow(false);
  }  
  const handleShow = () => {
    setSelectedAvatar(props.avatar);
    setShow(true);
  };  

  const handleSaveAvatar = (avatar) => {
    props.handleAvatarChange(avatar);
    handleClose();
  }

  return (
    <>
      <Button
        className="host-med-room-form-change-avatar-button"
        onClick={() => handleShow()}
        variant="danger"
      >
        Change Avatar
      </Button>
      <div className="avatar-selection-container">
        <Modal show={show} onHide={() => handleClose()} centered className="avatar-selection-modal">
          <Modal.Header closeButton>
            <Modal.Title>Choose Avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body className="avatar-list-container">
            {avatars.map((avatar) => (
                <div className={avatar === selectedAvatar ? "active-avatar" : "inactive-avatar"}>
                    <Image src={avatar} className="avatar-svg" onClick={() => setSelectedAvatar(avatar)}/>
                </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleClose()}>
              Close
            </Button>
            <Button variant="success" onClick={() => handleSaveAvatar(selectedAvatar)}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        s
      </div>
    </>
  );
}

export default AvatarSelectionCard;
