import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
/* import { db } from "../firebase"; */

const FormGroup = ({ label, placeholder, name, value, onChange }) => {
  return (
    <Form.Group as={Row} className="mb-3">
      <Form.Label column sm={3}>
        {label}
      </Form.Label>
      <Col sm={9}>
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

const LoanTypesEdit = () => {
  const history = useHistory();
  const { id } = useParams();

  const [details, setDetails] = useState({
    accType: "",
    accName: "",
    maxVal: "",
    loanRate: "",
    period: "",
    remarks: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  /* const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "employees", id), details);
    } catch (e) {
      console.error(e);
    }
    history.push("/accType");
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "employees", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        history.push("/accType");
      }
    })();
  }, []); */

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Update Loan Account Type
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Account Type ID
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  placeholder="Account Type ID"
                  name="accTypeId"
                  value={id}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form>
              <FormGroup
                label="Type"
                placeholder="Type"
                name="type"
                value={details.accType}
                onChange={setValue}
              />

              <FormGroup
                label="Name"
                placeholder="Name"
                name="name"
                value={details.accName}
                onChange={setValue}
              />

              <FormGroup
                label="Max Value (Rs.)"
                placeholder="Max Value (Rs.)"
                name="maxValue"
                value={details.maxVal}
                onChange={setValue}
              />

              <FormGroup
                label="Loan Rate (%)"
                placeholder="Loan Rate (%)"
                name="loanRate"
                value={details.loanRate}
                onChange={setValue}
              />

              <FormGroup
                label="Period (years)"
                placeholder="Period (years)"
                name="period"
                value={details.period}
                onChange={setValue}
              />

              <FormGroup
                label="Remarks"
                placeholder="Remarks"
                name="remarks"
                value={details.remarks}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button variant="success" /* onClick={handleUpdate} */>
                    Update
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/accType")}
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

export default LoanTypesEdit;
