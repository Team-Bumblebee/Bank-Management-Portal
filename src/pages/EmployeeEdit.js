import { doc, getDoc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { db } from "../firebase";

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

const EmployeeEdit = () => {
  const history = useHistory();
  const { id } = useParams();

  const [details, setDetails] = useState({
    name: "",
    address: "",
    mobileNo: "",
    age: "",
    gender: "Male",
    email: "",
    password: "",
    department: "admin",
    position: "",
    salary: "",
  });

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const handleUpdate = async () => {
    try {
      await setDoc(doc(db, "employees", id), details);
    } catch (e) {
      console.error(e);
    }
    history.push("/employee");
  };

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "employees", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDetails(docSnap.data());
      } else {
        history.push("/employee");
      }
    })();
  }, []);

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Update Employee
          </Card.Header>
          <Card.Body>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={3}>
                Employee ID
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  placeholder="Employee ID"
                  name="empId"
                  value={id}
                  disabled={true}
                />
              </Col>
            </Form.Group>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Name"
                name="name"
                value={details.name}
                onChange={setValue}
              />

              <FormGroup
                label="Address"
                placeholder="Address"
                name="address"
                value={details.address}
                onChange={setValue}
              />

              <FormGroup
                label="Mobile"
                placeholder="Mobile Number"
                name="mobileNo"
                value={details.mobileNo}
                onChange={setValue}
              />

              <FormGroup
                label="Age"
                placeholder="Age"
                name="age"
                value={details.age}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Gender
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="gender"
                    value={details.gender}
                    onChange={setValue}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>
                  Department
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    name="department"
                    value={details.department}
                    onChange={setValue}
                  >
                    <option value="admin">Administration</option>
                    <option value="cash">Accounts</option>
                    <option value="pawn">Pawn</option>
                    <option value="loan">Loan</option>
                  </Form.Select>
                </Col>
              </Form.Group>

              <FormGroup
                label="Position"
                placeholder="Position"
                name="position"
                value={details.position}
                onChange={setValue}
              />

              <FormGroup
                label="Salary"
                placeholder="Salary"
                name="salary"
                value={details.salary}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 9, offset: 3 }}>
                  <Button variant="success" onClick={handleUpdate}>
                    Update
                  </Button>
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/employee")}
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

export default EmployeeEdit;
