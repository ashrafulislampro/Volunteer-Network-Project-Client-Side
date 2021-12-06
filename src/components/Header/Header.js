import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/Group 1329.png";
import "./Header.css";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const handleRegButton = () =>{
    history.push('/registration');
  }
  const handleAdmButton = () =>{
    history.push('/addEvents');
    
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container >
        <Navbar.Brand>
          <img className="logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse  className="justify-content-end">
          <Nav>
            <Nav.Link>
              <Link className="link" to="/home">
                Home
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/donation">
                Donation
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/addEvents">
                Events
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link className="link" to="/blog">
                Blog
              </Link>
            </Nav.Link>
            {loggedInUser.name ? <h4 style={{marginTop : "8px", marginRight : "5px"}}>{loggedInUser.name}</h4> :
                <Button onClick={handleRegButton} className="nav_btn" variant="primary">
               Register
            </Button>}
            <Button onClick={handleAdmButton} className="nav_btn" variant="secondary">
              Admin
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
