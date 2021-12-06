import React, { useEffect, useState } from "react";
import Events from "../Events/Events";
import Button from 'react-bootstrap/Button';
import './Home.css';
const Home = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5055/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);
  return (
    <div className="home_content">
      <div>
        <div className="form_field">
          <h1>I GROW BY HELPING PEOPLE IN NEED</h1>
          <input type="search" name="" id="" />
          <Button className="bt" type="search">Search</Button>
        </div>
      </div>
      <div className="row">
        {events.map((event) => (
          <Events event={event} key={event._id}></Events>
        ))}
      </div>
    </div>
  );
};

export default Home;
