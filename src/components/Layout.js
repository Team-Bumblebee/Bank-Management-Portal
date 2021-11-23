import React from "react";
import { Button, Card, Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useAuth from "../contexts/AuthContext";

const Layout = ({ children }) => {
  const history = useHistory();
  const { userDetails } = useAuth();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand
            onClick={() => history.push("/")}
            role="button"
            style={{ fontSize: 24 }}
          >
            <img
              alt=""
              src="/logo512.png"
              width="32"
              height="32"
              className="d-inline-block align-top"
              style={{ marginRight: 50 }}
            />
            Bank Management Portal
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              {userDetails &&
                `Welcome ${userDetails.fName} ${userDetails.lName}`}
            </Nav.Link>
          </Nav>
          <Nav className="justify-content-end">
            <Nav.Link>
              <Button
                variant="dark"
                style={{ backgroundColor: "darkslategrey" }}
              >
                LOGOUT
              </Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div
        style={{
          minHeight: "calc(100vh - 111px)",
          backgroundColor: "#fafafa",
        }}
      >
        {children}
      </div>
      <Card.Footer
        className="text-center"
        style={{ color: "darkgreen", backgroundColor: "lightgrey" }}
      >
        <i>Developed by Team Bumblebee</i>
      </Card.Footer>
    </div>
  );
};

export default Layout;
