import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./BiddingCard.css";

function BiddingCard(props) {
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(props.currentBidAmount);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSubmitBid = () => {
    console.log('submitted bid');
    props.setIsTurn(false);
    props.onBid(selectedOption);
    setShowModal(false);
  }

  const handlePassBid = () => {
    props.setIsTurn(false);
    props.onPass();
    setShowModal(false);   
  }

  let bidOptions = [];
  let minBid = 0;
  if(props.currentBidAmount < 7){
    minBid = 7;
  } else {
    minBid = props.currentBidAmount;
  }
  for (let i = minBid; i <= 13; i++) {
    bidOptions.push(i);
  }

  const handleOptionSelect = (event) =>{
    setSelectedOption(parseInt(event.target.value, 10));
  };

  return (
    <>
      <div className="bidding-card-container">
        <Modal show={props.isTurn} onHide={() => handleCloseModal()} centered className="bidding-modal">
          <Modal.Header>
            <Modal.Title>Select Bid</Modal.Title>
            <Modal.Body>
              <div className="bidding-modal-options-container">
              {bidOptions.map((optionValue, index) => (
                <Button onClick={() => setSelectedOption(optionValue)} variant={selectedOption === optionValue ? "danger" : "warning"}>{optionValue}</Button>
              ))}
              </div>
            </Modal.Body>
          </Modal.Header>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handlePassBid()}>
              Pass
            </Button>
            <Button variant="primary" onClick={() => handleSubmitBid()}>
              Bid Higher
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default BiddingCard;


/***
 * 
 * 
 * <Button variant="primary" onClick={handleOpenModal}>
          Open Bid Modal
        </Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Bidding Modal</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {props.isTurn ?
                <h3> Your Turn! </h3>
            : 
                <h3> Not Your Turn! </h3>
            }
            <label>Current Highest Bid:</label>
            <p>{props.currentBidAmount}</p>

            <label>By:</label>
            <p>{props.bidderName}</p>

            <label>Would you like to bid higher or pass?</label>

            <select value={selectedOption} onChange={handleOptionSelect}>
              {bidOptions.map((optionValue, index) => (
                <option key={index} value={optionValue}>
                  {optionValue}
                </option>
              ))}
            </select>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.onPass}>
              Pass
            </Button>
            <Button variant="primary" onClick={props.onBid(selectedOption)}>
              Bid Higher
            </Button>
          </Modal.Footer>
        </Modal>
*/
