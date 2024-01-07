import { Card } from "react-bootstrap";
import "./PlayingCard.css";
import Diamond from "../../images/diamond.svg";
import Heart from "../../images/heart.svg";
import Club from "../../images/club.svg";
import Spade from "../../images/spade.svg";

const PlayingCard = ({ number, shape, isUp}) => {
  const shapes = {
    diamond: Diamond,
    heart: Heart,
    club: Club,
    spade: Spade,
  };

  const colors = {
    diamond: "red",
    heart: "red",
    club: "black",
    spade: "black",
  };

  return (
    <Card className={`playing-card ${isUp ? "up" : ""}`}>
      <Card.Body className="card-body">
        <div className="playing-card-main-content">
          <Card.Text
            className="playing-card-number"
            style={{ color: colors[shape] }}
          >
            {number}
          </Card.Text>
          <Card.Img
            src={shapes[shape]}
            alt={shape}
            className="playing-card-shape"
          />
        </div>
        <div className="playing-card-secondary-content">
          <Card.Img
            src={shapes[shape]}
            alt={shape}
            className="playing-card-secondary-shape"
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default PlayingCard;
