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

const CashEdit = () => {
  const history = useHistory();
  const { id } = useParams();

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

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    const { accName, accType: type, interestRate } = accounts[selectedAccount];
    setShowSuccessMsg(false);
    try {
      await setDoc(doc(db, "cashaccounts", id), {
        ...details,
        accName,
        type,
        interestRate,
      });
      setShowSuccessMsg(true);
    } catch (e) {
      console.error(e);
    }
    setTimeout(() => {
      history.push("/cash");
    }, 2000);
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "cashaccounts", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        history.push("/cash");
        return;
      }
      const q = query(
        collection(db, "accounttypes"),
        where("category", "==", "cash")
      );
      const querySnapshot = await getDocs(q);
      setAccountTypes(
        Array.from(new Set(querySnapshot.docs.map((doc) => doc.data().accType)))
      );
      setSelectedType(docSnap.data().type);
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
            Update Account
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2}>
                Account Number
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
                  <Button variant="success" onClick={handleUpdate}>
                    Update
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
                <Alert variant="success">
                  Cash account successfully updated !
                </Alert>
              )}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CashEdit;
