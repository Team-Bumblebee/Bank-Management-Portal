import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const CashAdd = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5">Create a Cash Account</Card.Header>
          <Card.Body>
            <Form>
              {/* <th>Name</th>
                <th>Address</th>
                <th>Number</th>
                <th>Age</th>
                <th>Interest Rate</th>
                <th>Type</th>
                <th>Remarks</th> */}
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Name" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Address
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Address" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Mobile
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Mobile" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Age
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Age" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Interest Rate
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Interest Rate" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Type
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Type" />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Remarks
                </Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Remarks" />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="success">Create</Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CashAdd;
