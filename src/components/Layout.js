import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Layout = ({ children }) => {
  const history = useHistory();

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
            {/* <Nav.Link>Home</Nav.Link>
            <Nav.Link>Features</Nav.Link>
            <Nav.Link>Pricing</Nav.Link> */}
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
