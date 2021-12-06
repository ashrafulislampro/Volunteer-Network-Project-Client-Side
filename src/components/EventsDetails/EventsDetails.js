import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./EventsDetails.css";
const EventsDetails = () => {
  const { id } = useParams();
  const [events, setEvents] = useState({});
  useEffect(() => {
    fetch("http://localhost:5055/event/" + id)
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, [id]);
  console.log(events);
  return (
    <Container>
      <Row style={{marginTop: "40px"}}>
        <Col xs={12} md={12} lg={6} style={{marginTop: "10px"}}>
          <div className="event-details">
            <div>
              <img
                style={{ width: "180px", height: "150px" ,marginLeft: "40px"}}
                src={events.imageURL}
                alt=""
              />
            </div>
            <div className="event_field">
              <h3>{events.eventName}</h3>
              <button>cancel</button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} style={{marginTop: "10px"}}>
          <div className="event-details">
            <div>
              <img
                style={{ width: "180px", height: "150px" ,marginLeft: "40px" }}
                src={events.imageURL}
                alt=""
              />
            </div>
            <div className="event_field">
              <h3>{events.eventName}</h3>
              <button>cancel</button>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop: "50px"}}>
        <Col xs={12} md={12} lg={6} me={2} style={{marginTop: "10px"}}>
          <div className="event-details">
            <div>
              <img
                style={{ width: "180px", height: "150px" ,marginLeft: "40px" }}
                src={events.imageURL}
                alt=""
              />
            </div>
            <div className="event_field">
              <h3>{events.eventName}</h3>
              <button>cancel</button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} lg={6} m={2} style={{marginTop: "10px"}}>
          <div className="event-details">
            <div>
              <img
                style={{ width: "180px", height: "150px" ,marginLeft: "40px" }}
                src={events.imageURL}
                alt=""
              />
            </div>
            <div className="event_field">
              <h3 >{events.eventName}</h3>
              <button>cancel</button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EventsDetails;
