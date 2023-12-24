import React from "react";
import "./TarneebHeader.css";
import Spade from "../../images/spade.svg";
import { Image } from "react-bootstrap";

function TarneebHeader() {
  return (
    <h1 className="tarneeb-header">
      T<Image src={Spade} className="spade-title" />
      RNEEB
    </h1>
  );
}

export default TarneebHeader;
