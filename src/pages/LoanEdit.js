import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
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

const LoanEdit = () => {
  const history = useHistory();
  const { id } = useParams();
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [details, setDetails] = useState({
    loanHolderName: "",
    loanHolderAddress: "",
    loanHolderMobileNo: "",
    loanHolderAge: "",
    amount: "",
    accType: "",
    accName: "",
    loanRate: "",
    duration: "",
    description: "",
  });

  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    setShowSuccessMsg(false);
    try {
      await setDoc(doc(db, "loanaccounts", id), details);
    } catch (e) {
      console.error(e);
    }
    setShowSuccessMsg(true);
    setTimeout(() => {
      history.push("/loan");
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "loanaccounts", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        history.push("/loan");
        return;
      }
      const q = query(
        collection(db, "accounttypes"),
        where("category", "==", "loan")
      );
      const querySnapshot = await getDocs(q);
      setAccountTypes(
        Array.from(new Set(querySnapshot.docs.map((doc) => doc.data().accType)))
      );
      setSelectedType(querySnapshot.docs[0].data().accType);
      setAccounts(
        querySnapshot.docs.map((doc, index) => ({ index, ...doc.data() }))
      );
      setSelectedAccount(
        querySnapshot.docs.findIndex(
          (doc) => doc.data().accName === docSnap.data().accName
        )
      );
      setDetails(docSnap.data());
    })();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Update Loan Account Details
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Type
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  disabled={true}
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value) +
                    setSelectedAccount(
                      accounts.findIndex(
                        (account) => account.accType === e.target.value
                      )
                    )
                  }
                >
                  {accountTypes.map((accountType) => (
                    <option key={accountType} value={accountType}>
                      {accountType}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Name
              </Form.Label>
              <Col sm={10}>
                <Form.Select
                  disabled={true}
                  value={selectedAccount}
                  onChange={(e) => setSelectedAccount(e.target.value)}
                >
                  {accounts
                    .filter((account) => account.accType === selectedType)
                    .map((account) => (
                      <option key={account.accName} value={account.index}>
                        {account.accName}
                      </option>
                    ))}
                </Form.Select>
              </Col>
            </Form.Group>

            <Form>
              <FormGroup
                label="Name"
                placeholder="Loan Holder's Name"
                name="loanHolderName"
                value={details.loanHolderName}
                onChange={setValue}
              />

              <FormGroup
                label="Address"
                placeholder="Address"
                name="loanHolderAddress"
                value={details.loanHolderAddress}
                onChange={setValue}
              />

              <FormGroup
                label="Mobile"
                placeholder="Mobile"
                name="loanHolderMobileNo"
                value={details.loanHolderMobileNo}
                onChange={setValue}
              />

              <FormGroup
                label="Age"
                placeholder="Age"
                name="loanHolderAge"
                value={details.loanHolderAge}
                onChange={setValue}
              />

              <FormGroup
                label="Amount"
                placeholder="Amount"
                name="amount"
                value={details.amount}
                onChange={setValue}
              />

              <FormGroup
                label="Loan Rate"
                placeholder="Loan Rate"
                name="loanRate"
                value={details.loanRate}
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
                  <Button variant="success" onClick={handleUpdate}>
                    Update Details
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/loan")}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                </Col>
              </Form.Group>
              {showSuccessMsg && (
                <Alert variant="success">
                  Loan Account successfully updated !
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default LoanEdit;
