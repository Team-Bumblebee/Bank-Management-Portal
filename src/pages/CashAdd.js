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

const CashAdd = () => {
  const history = useHistory();
  const [details, setDetails] = useState({
    accHolderName: "",
    accHolderAddress: "",
    accHolderMobileNo: "",
    accHolderAge: "",
    interestRate: "",
    type: "",
    accName: "",
    remarks: "",
  });

  const [showSuccessMsg, setShowSuccessMsg] = useState(false);

  const [accountTypes, setAccountTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(0);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "accounttypes"),
        where("category", "==", "cash")
      );
      const querySnapshot = await getDocs(q);
      setAccountTypes(
        Array.from(new Set(querySnapshot.docs.map((doc) => doc.data().accType)))
      );
      setSelectedType(querySnapshot.docs[0].data().accType);
      setAccounts(
        querySnapshot.docs.map((doc, index) => ({ index, ...doc.data() }))
      );
    })();
  }, []);

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleCreate = async () => {
    const { accName, accType: type, interestRate } = accounts[selectedAccount];
    setShowSuccessMsg(false);
    const cashCounterDocRef = doc(db, "counters", "cash-accounts");
    try {
      await runTransaction(db, async (transaction) => {
        const cashCounterDoc = await transaction.get(cashCounterDocRef);
        const newCount = cashCounterDoc.data().count + 1;
        let concat = "00000000" + newCount;
        transaction.set(
          doc(db, "cashaccounts", "CA" + concat.substring(concat.length - 8)),
          { ...details, accName, type, interestRate }
        );
        transaction.update(cashCounterDocRef, { count: newCount });
      });
      setShowSuccessMsg(true);
      clear();
      setTimeout(() => {
        history.push("/cash");
      }, 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const clear = () => {
    setDetails({
      accHolderName: "",
      accHolderAddress: "",
      accHolderMobileNo: "",
      accHolderAge: "",
      interestRate: "",
      type: "",
      remarks: "",
    });
  };

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Create a Cash Account
          </Card.Header>
          <Card.Body>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Name"
                name="accHolderName"
                value={details.accHolderName}
                onChange={setValue}
              />

              <FormGroup
                label="Address"
                placeholder="Address"
                name="accHolderAddress"
                value={details.accHolderAddress}
                onChange={setValue}
              />

              <FormGroup
                label="Mobile"
                placeholder="Mobile"
                name="accHolderMobileNo"
                value={details.accHolderMobileNo}
                onChange={setValue}
              />

              <FormGroup
                label="Age"
                placeholder="Age"
                name="accHolderAge"
                value={details.accHolderAge}
                onChange={setValue}
              />

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

              <FormGroup
                label="Remarks"
                placeholder="Remarks"
                name="remarks"
                value={details.remarks}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                  <Button variant="success" onClick={handleCreate}>
                    Create
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/cash")}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                </Col>
              </Form.Group>
              {showSuccessMsg && (
                <Alert variant="success">Account successfully added !</Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CashAdd;
