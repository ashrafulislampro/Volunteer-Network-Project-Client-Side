import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./AddEvents.css";
import iconsUser from "../../images/users-alt 1.png";
import iconsPlus from "../../images/plus 1.png";
import { Container, Row, Col } from "react-bootstrap";
const AddEvents = () => {
  const [imageURL, setImageURL] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 
  const onSubmit = (data) => {
    const eventData = {
      eventName: data.name,
      date: data.date,
      description: data.description,
      imageURL: imageURL,
    };
    fetch("https://glacial-chamber-71006.herokuapp.com/addEvent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    console.log(data);
    console.log(eventData);
  };

  const handleImageUpload = (event) => {
    console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set("key", "cb2f23293e08c6ab301b0e0cbade3367");
    imageData.append("image", event.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container>
    <Row>
    <Col xs={12} md={4} lg={2}>
      <div style={{ marginTop: "50px"}}>
        <p>
          <img
            style={{ width: "25px", marginRight: "10px" }}
            src={iconsUser}
            alt=""
          />
          Volunteer register list
        </p>
        <p>
          <img
            style={{ width: "25px", marginRight: "10px" }}
            src={iconsPlus}
            alt=""
          />
          Add event
        </p>
      </div>
      </Col>
      <Col xs={12} md={8} lg={10}>
      <div>
        <div className="event_content">
        <h4>Add Event</h4>
          <div className="add_events">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "20px",
                }}
              >
                <label htmlFor="event-name">
                  Add Event
                  <br />
                  <input
                    type="text"
                    {...register("name")} 
                    id="event-name"
                    placeholder="Enter event name"
                  />
                </label>
                <label htmlFor="event-date">
                  Date
                  <br />
                  <input
                    type="date"
                    {...register("date")} 
                    id="event-date"
                    placeholder="Enter event date"
                  />
                </label>
              </div>
              <br />
              
              <div style={{ display: "flex", justifyContent: "center" }}>
              
                <label htmlFor="story">
                  <span>Description</span>
                  <br />
                  <textarea
                    id="story"
                    {...register("description")} 
                    rows="3"
                    cols="45"
                    placeholder="Enter description"
                  ></textarea>
                </label>
                
                <label htmlFor="event-pic">
                  Upload Pic
                  <br />
                  <input
                    name="imgUrl"
                    id="event-pic"
                    type="file"
                    onChange={handleImageUpload}
                  />
                </label>
                </div>
              
              <br />
              <input className="submit_field" type="submit" />
            </form>
          </div>
        </div>
      </div>
      </Col>
    </Row>
    </Container>
  );
};

export default AddEvents;
