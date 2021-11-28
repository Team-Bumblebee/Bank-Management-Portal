import React, { useState } from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import CashType from "./CashTypes";
import LoanType from "./LoanTypes";
import PawnType from "./PawnTypes";
import { useParams } from "react-router-dom";

const AccHome = () => {
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();
  return (
    <div className="py-5">
      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Account Types</h4>
          </div>
        </Card>
        <Tab.Container
          id="left-tabs-example"
          defaultActiveKey={id}
          onSelect={() => setRefresh(!refresh)}
        >
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
                  <CashType refresh={refresh} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <LoanType refresh={refresh} />
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <PawnType refresh={refresh} />
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
