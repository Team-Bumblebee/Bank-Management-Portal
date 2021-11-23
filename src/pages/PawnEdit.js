import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
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

const PawnEdit = () => {
  const history = useHistory();
  const { id } = useParams();

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

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "pawnaccounts", id), details);
    } catch (e) {
      console.error(e);
    }
    history.push("/pawn");
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "pawnaccounts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        history.push("/pawn");
      }
    })();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Update Pawn Account Details
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Pawn Account Number
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  placeholder="Account Number"
                  name="accNumber"
                  value={id}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form>
              <FormGroup
                label="Account Name"
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
                label="Item Value(Rs.)"
                placeholder="Item Value"
                name="itemValue"
                value={details.itemValue}
                onChange={setValue}
              />

              <FormGroup
                label="Duration"
                placeholder="Duration"
                name="duration"
                value={details.duration + " years"}
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
                  <Button variant="success" onClick={handleUpdate}>
                    Update Details
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/pawn")}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
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

export default PawnEdit;
