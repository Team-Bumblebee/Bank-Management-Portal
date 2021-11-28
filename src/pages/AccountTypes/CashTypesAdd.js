import { doc, runTransaction } from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { db } from "../../firebase";

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

const CashTypesAdd = () => {
  const history = useHistory();
  const [details, setDetails] = useState({
    accType: "",
    accName: "",
    category: "cash",
    ageGroup: "",
    interestRate: "",
    remarks: "",
  });

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    setShowSuccessMsg(false);
    const accountTypesCounterDocRef = doc(db, "counters", "account-types");
    try {
      await runTransaction(db, async (transaction) => {
        const accountTypesCounterDoc = await transaction.get(
          accountTypesCounterDocRef
        );
        const newCount = accountTypesCounterDoc.data().count + 1;
        let concat = "00000000" + newCount;
        transaction.set(
          doc(db, "accounttypes", "AT" + concat.substring(concat.length - 8)),
          details
        );
        transaction.update(accountTypesCounterDocRef, { count: newCount });
      });
      setShowSuccessMsg(true);
      clear();
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () =>
    setDetails({
      accType: "",
      accName: "",
      category: "cash",
      ageGroup: "",
      interestRate: "",
      remarks: "",
    });

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Add Cash Account Type
          </Card.Header>
          <Card.Body>
            <Form>
              <FormGroup
                label="Type"
                placeholder="Type"
                name="accType"
                value={details.accType}
                onChange={setValue}
              />

              <FormGroup
                label="Name"
                placeholder="Name"
                name="accName"
                value={details.accName}
                onChange={setValue}
              />

              <FormGroup
                label="Age Group (years)"
                placeholder="Age Group (years)"
                name="ageGroup"
                value={details.ageGroup}
                onChange={setValue}
              />

              <FormGroup
                label="Interest Rate (%)"
                placeholder="Interest Rate (%)"
                name="interestRate"
                value={details.interestRate}
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
                <Col sm={{ span: 5, offset: 2 }}>
                  <Button variant="success" onClick={handleCreate}>
                    Create
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push(`/accType/${"first"}`)}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                </Col>
              </Form.Group>
              {showSuccessMsg && (
                <Alert variant="success">
                  Cash Account Type successfully added !
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CashTypesAdd;
