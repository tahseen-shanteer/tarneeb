import React from "react";
import './AvatarSelectionCard.css';
import Avatar1 from "../../images/avatar1.svg";
import Avatar2 from "../../images/avatar2.svg";
import Avatar3 from "../../images/avatar3.svg";
import Avatar4 from "../../images/avatar4.svg";
import Avatar5 from "../../images/avatar5.svg";
import Avatar6 from "../../images/avatar6.svg";
import Avatar7 from "../../images/avatar7.svg";
import Avatar8 from "../../images/avatar8.svg";
import Avatar9 from "../../images/avatar9.svg";
import Avatar10 from "../../images/avatar10.svg";
import Avatar11 from "../../images/avatar11.svg";
import Avatar12 from "../../images/avatar12.svg";
import Avatar13 from "../../images/avatar13.svg";
import Avatar14 from "../../images/avatar14.svg";
import Avatar15 from "../../images/avatar15.svg";
import DefaultProfile from "../../images/defaultProfile.svg";
import { Card, Image } from "react-bootstrap";

function AvatarSelectionCard(props) {
    const avatars = [DefaultProfile, Avatar2, Avatar3, Avatar4, Avatar5, Avatar6, Avatar8, Avatar9, Avatar10,
    Avatar11, Avatar12, Avatar13, Avatar14, Avatar15];

    return (
        <div className="avatar-selection-container">
            <Card className="avatar-selection-card">
                <Card.Title className="avatar-selection-card-title">Choose Avatar</Card.Title>
                <div className="avatar-list-container">
                    {avatars.map((avatar) => (
                        <div className={avatar === props.avatar ? "active-avatar" : "inactive-avatar"}>
                            <Image src={avatar} className="avatar-svg" />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

export default AvatarSelectionCard;