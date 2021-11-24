import React from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import CashType from "./CashTypes";
import LoanType from "./LoanTypes";
import PawnType from "./PawnTypes";

const AccHome = () => {
  return (
    <div className="py-5">
      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Account Types</h4>
          </div>
        </Card>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2} className="py-3">
              <Nav variant="pills" className="flex-column">
                <Nav.Item role="button">
                  <Nav.Link eventKey="first">Cash</Nav.Link>
                </Nav.Item>
                <Nav.Item role="button">
                  <Nav.Link eventKey="second">Loan</Nav.Link>
                </Nav.Item>
                <Nav.Item role="button">
                  <Nav.Link eventKey="third">Pawn</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <CashType />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <LoanType />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <PawnType />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default AccHome;
