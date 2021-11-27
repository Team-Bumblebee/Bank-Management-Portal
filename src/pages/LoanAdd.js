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

const LoanAdd = () => {
  const history = useHistory();

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

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showWarningMsg, setShowWarningMsg] = useState(false);

  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState();

  useEffect(() => {
    if (selectedAccount !== undefined)
      setDetails((details) => ({
        ...details,
        loanRate: accounts[selectedAccount].loanRate,
        duration: accounts[selectedAccount].period,
      }));
  }, [selectedAccount]);

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    const { accName, accType, loanRate } = accounts[selectedAccount];
    if (accType && details.loanHolderName && accName && details.amount) {
      setShowWarningMsg(false);
      setShowSuccessMsg(false);
      const loanCounterDocRef = doc(db, "counters", "loan-accounts");
      try {
        await runTransaction(db, async (transaction) => {
          const loanCounterDoc = await transaction.get(loanCounterDocRef);
          const newCount = loanCounterDoc.data().count + 1;
          let concat = "0000000" + newCount;
          transaction.set(
            doc(db, "loanaccounts", "LA" + concat.substring(concat.length - 8)),
            { ...details, accName, accType, loanRate }
          );
          transaction.update(loanCounterDocRef, { count: newCount });
        });
        setShowSuccessMsg(true);
        clear();
        setTimeout(() => {
          history.push("/loan");
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
  };

  useEffect(() => {
    (async () => {
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
      setSelectedAccount(0);
    })();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Create a Loan Account
          </Card.Header>
          {(showSuccessMsg || showWarningMsg) && (
            <Alert variant={showSuccessMsg ? "success" : "danger"}>
              {showSuccessMsg
                ? "Loan Account successfully added !"
                : "Account , Name, Amount cannot be empty !"}
            </Alert>
          )}
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Type
              </Form.Label>
              <Col sm={10}>
                <Form.Select
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
                  <Button variant="success" onClick={handleCreate}>
                    Create Account
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/loan")}
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

export default LoanAdd;
