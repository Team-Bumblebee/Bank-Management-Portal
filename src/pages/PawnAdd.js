import {
  collection,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
    accType: "",
    pawnHolderName: "",
    pawnHolderAddress: "",
    pawnHolderMobileNo: "",
    pawnHolderAge: "",
    itemType: "",
    itemValue: "",
    duration: "",
    description: "",
  });

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showWarningMsg, setShowWarningMsg] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [interest, setInterest] = useState();
  const [ageGroup, setAgeGroup] = useState("");
  const [maxValue, setMaxValue] = useState("");

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    if (
      details.accType &&
      details.pawnHolderName &&
      details.itemType &&
      details.itemValue
    ) {
      setShowWarningMsg(false);
      setShowSuccessMsg(false);
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
        setShowSuccessMsg(true);
        clear();
        setTimeout(() => {
          history.push("/pawn");
        }, 2000);
      } catch (e) {
        console.error(e);
      }
    } else {
      setShowWarningMsg(true);
    }
  };

  const clear = () => {
    setShowWarningMsg(false);
    setDetails({
      accType: "",
      pawnHolderName: "",
      pawnHolderAddress: "",
      pawnHolderMobileNo: "",
      pawnHolderAge: "",
      itemType: "",
      itemValue: "",
      duration: "",
      description: "",
    });
    setInterest();
    setAgeGroup("");
    setMaxValue("");
  };

  useEffect(() => {
    (async () => {
      const docRef = query(
        collection(db, "accounttypes"),
        where("category", "==", "pawn")
      );
      const querySnapshot = await getDocs(docRef);
      setAccounts(
        querySnapshot.docs.map((doc) => ({ accNumber: doc.id, ...doc.data() }))
      );
    })();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Create a Pawn Account
          </Card.Header>
          {(showSuccessMsg || showWarningMsg) && (
            <Alert variant={showSuccessMsg ? "success" : "danger"}>
              {showSuccessMsg
                ? "Pawn Account successfully added !"
                : "Account Type, Name, Item Type, Item Value cannot be empty !"}
            </Alert>
          )}
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Type
              </Form.Label>
              <Col sm={5}>
                <Form.Select
                  value="defaultValue"
                  onChange={(e) =>
                    setDetails({
                      ...details,
                      accType: e.target.value.split(",")[0],
                    }) +
                    setInterest(e.target.value.split(",")[1]) +
                    setAgeGroup(e.target.value.split(",")[2]) +
                    setMaxValue(e.target.value.split(",")[3])
                  }
                >
                  <option value="defaultValue">Select Pawn Account Type</option>
                  {accounts.map((pawn) => (
                    <option
                      key={pawn.accName}
                      value={[
                        pawn.accName,
                        pawn.interestRate,
                        pawn.ageGroup,
                        pawn.maxVal,
                      ]}
                    >
                      {pawn.accName}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Form.Label column sm={5}>
                Interest Rate(%) = {interest}
              </Form.Label>
            </Form.Group>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Pawner's Name"
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
                placeholder={!ageGroup ? "Age" : "Should be " + ageGroup}
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
                placeholder={
                  !maxValue
                    ? "Item Value in Ruppees"
                    : "Max value is " + maxValue
                }
                name="itemValue"
                value={details.itemValue}
                onChange={setValue}
              />

              <FormGroup
                label="Duration"
                placeholder="Duration in years"
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
                    Create Account
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/pawn")}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => clear()}
                    style={{ marginLeft: 100 }}
                  >
                    Clear
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
