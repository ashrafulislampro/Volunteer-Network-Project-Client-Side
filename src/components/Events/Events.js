import Button from 'react-bootstrap/Button';
import React from "react";
import { Card, Col } from "react-bootstrap";
import "./Events.css";
import { useHistory } from "react-router-dom";
const Events = (props) => {
  const { eventName, _id, imageURL } = props.event;
  const history = useHistory();
  const handleButtonClick = id => {
    history.push(`/eventsDetails/${id}`);
  }
  const handleDeleteEvent = (id, event) => {
      fetch('http://localhost:5055/deleteEvent/'+id,{
        method: 'DELETE',
      })
      .then(res => res.json())
      .then(data => console.log(data));
  }
  return (
    <Col xs={6} md={4} lg={3} className="img-container">
      <Card style={{ width: "18rem", cursor: "pointer" }}>
        <Card.Img variant="top" onClick={ () => handleButtonClick(_id)} src={imageURL} />
        <Card.Body style={{display: "flex", padding: "5px"}}>
          <h3>{}</h3>
          <Button style={{ width: "150px" , marginRight: "2px"}} onClick={ () => handleButtonClick(_id)} variant="warning">{eventName}</Button>
          
          <Button style={{ width: "150px", marginLeft: "2px"}} onClick={ () => handleDeleteEvent(_id)} variant="warning">Delete</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Events;
