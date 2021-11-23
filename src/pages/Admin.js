import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const AdminButton = ({ children, onClick }) => {
  return (
    <Col xs={4}>
      <Button
        style={{ width: "18rem" }}
        className="mb-2"
        variant="success"
        size="lg"
        onClick={onClick}
      >
        {children}
      </Button>
    </Col>
  );
};

const Admin = () => {
  const history = useHistory();

  return (
    <div
      style={{ height: "calc(100vh - 111px)" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Container>
        <Row>
          <AdminButton onClick={() => history.push("/employee")}>
            Employee Details
          </AdminButton>
          <AdminButton onClick={() => history.push("/")}>
            Account Types
          </AdminButton>
          <AdminButton onClick={() => history.push("/")}>
            Log Details
          </AdminButton>
          <AdminButton onClick={() => history.push("/cash")}>
            Cash Accounts
          </AdminButton>
          <AdminButton onClick={() => history.push("/")}>
            Loan Accounts
          </AdminButton>
          <AdminButton onClick={() => history.push("/pawn")}>
            Pawn Accounts
          </AdminButton>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
