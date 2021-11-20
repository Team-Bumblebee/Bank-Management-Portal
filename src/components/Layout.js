import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useAuth from "../contexts/AuthContext";

const Layout = ({ children }) => {
  const history = useHistory();
  const { userDetails } = useAuth();

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={() => history.push("/")} role="button">
            {/* <img
              alt=""
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            /> */}
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
              <Button variant="outline-light">LOGOUT</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div
        style={{
          minHeight: "calc(100vh - 56px)",
          backgroundColor: "#fafafa",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
