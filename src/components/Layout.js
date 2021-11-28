import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { Button, Card, Container, Modal, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import useAuth from "../contexts/AuthContext";
import { auth } from "../firebase";

const Layout = ({ children }) => {
  const history = useHistory();
  const { user, userDetails } = useAuth();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    signOut(auth);
    history.push("/");
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>You are trying to logout from your account</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
      <Navbar bg="dark" variant="dark" style={{ minHeight: "70px" }}>
        <Container>
          <Navbar.Brand
            onClick={() =>
              history.push("/" + (userDetails ? userDetails.department : ""))
            }
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

          {user && (
            <Nav className="me-auto">
              <Nav.Link role="banner">
                {userDetails && `Welcome, ${userDetails.name}`}
              </Nav.Link>
            </Nav>
          )}

          {user && (
            <Nav className="justify-content-end">
              <Nav.Link>
                <Button
                  variant="dark"
                  style={{
                    backgroundColor: "lightslategrey",
                  }}
                  onClick={handleShow}
                >
                  LOGOUT
                </Button>
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
      <div
        style={{
          minHeight: "calc(100vh - 111px)",
          backgroundColor: "#c3f2d7",
        }}
      >
        {children}
      </div>
      <Card.Footer className="bg-dark text-center text-white">
        <i>Developed by Team Bumblebee</i>
      </Card.Footer>
    </div>
  );
};

export default Layout;
