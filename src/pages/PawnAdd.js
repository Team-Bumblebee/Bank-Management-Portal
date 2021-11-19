import { doc, runTransaction } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db } from "../firebase";

const FormGroup = ({ label, placeholder, name, value, onChange }) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={2}>
        {label}
      </Form.Label>
      <Col sm={10}>
        <Form.Control
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
};

const PawnAdd = () => {
  const history = useHistory();

  const [details, setDetails] = useState({
    pawnHolderName: "",
    pawnHolderAddress: "",
    pawnHolderMobileNo: "",
    pawnHolderAge: "",
    itemType: "",
    itemValue: "",
    duration: "",
    description: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    console.log(details);
    const pawnCounterDocRef = doc(db, "counters", "pawn-accounts");
    try {
      await runTransaction(db, async (transaction) => {
        const pawnCounterDoc = await transaction.get(pawnCounterDocRef);
        const newCount = pawnCounterDoc.data().count + 1;
        let concat = "0000000" + newCount;
        transaction.set(
          doc(db, "pawnaccounts", "PA" + concat.substring(concat.length - 8)),
          details
        );
        transaction.update(pawnCounterDocRef, { count: newCount });
      });
      history.push("/pawn");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5">Create a Pawn Account</Card.Header>
          <Card.Body>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Name"
                name="pawnHolderName"
                value={details.pawnHolderName}
                onChange={setValue}
              />

              <FormGroup
                label="Address"
                placeholder="Address"
                name="pawnHolderAddress"
                value={details.pawnHolderAddress}
                onChange={setValue}
              />

              <FormGroup
                label="Mobile"
                placeholder="Mobile"
                name="pawnHolderMobileNo"
                value={details.pawnHolderMobileNo}
                onChange={setValue}
              />

              <FormGroup
                label="Age"
                placeholder="Age"
                name="pawnHolderAge"
                value={details.pawnHolderAge}
                onChange={setValue}
              />

              <FormGroup
                label="Item Type"
                placeholder="Item Type"
                name="itemType"
                value={details.itemType}
                onChange={setValue}
              />

              <FormGroup
                label="Item Value"
                placeholder="Item Value"
                name="itemValue"
                value={details.itemValue}
                onChange={setValue}
              />

              <FormGroup
                label="Duration"
                placeholder="Duration"
                name="duration"
                value={details.duration}
                onChange={setValue}
              />

              <FormGroup
                label="Description"
                placeholder="Description"
                name="description"
                value={details.description}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="success" onClick={handleCreate}>
                    Create
                  </Button>
                </Col>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PawnAdd;
