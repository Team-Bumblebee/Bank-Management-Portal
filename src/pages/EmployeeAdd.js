import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { functions } from "../firebase";

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

const EmployeeAdd = () => {
  const history = useHistory();
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const setValue = (e) =>
    setDetails((details) => ({ ...details, [e.target.name]: e.target.value }));

  const validate = () => {
    const email = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (
      email.test(details.email) &&
      details.password.length >= 6 &&
      details.name !== ""
    )
      return true;
    else return false;
  };

  const handleCreate = async () => {
    setShowSuccessMsg(false);
    setError(false);
    if (validate()) {
      setLoading(true);
      try {
        const addEmployee = httpsCallable(functions, "addEmployee");
        await addEmployee({ details });
        setShowSuccessMsg(true);
        clear();
      } catch (e) {
        setErrorMsg("Please try again !");
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMsg("Please enter valide Employee Name, Email, Password !");
      setError(true);
    }
  };

  const clear = () =>
    setDetails({
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

  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card style={{ width: "60%" }} border="success">
          <Card.Header as="h5" style={{ color: "darkolivegreen" }}>
            Add Employee
          </Card.Header>
          <Card.Body>
            <Form>
              <FormGroup
                label="Name"
                placeholder="Employee Name"
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
                <Form.Label column sm={2}>
                  Gender
                </Form.Label>
                <Col sm={10}>
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

              <FormGroup
                label="Email"
                placeholder="Email"
                name="email"
                value={details.email}
                onChange={setValue}
              />

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Password
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    placeholder="Password (at least 6 characters)"
                    name="password"
                    type="password"
                    value={details.password}
                    onChange={setValue}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>
                  Department
                </Form.Label>
                <Col sm={10}>
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
                <Col sm={{ span: 5, offset: 2 }}>
                  {!loading ? (
                    <Button variant="success" onClick={handleCreate}>
                      Create
                    </Button>
                  ) : (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}
                  <Button
                    variant="outline-secondary"
                    onClick={() => history.push("/employee")}
                    style={{ marginLeft: 48 }}
                  >
                    <i className="bi bi-arrow-left"></i>&nbsp; Go Back
                  </Button>
                </Col>
              </Form.Group>
              {showSuccessMsg && (
                <Alert variant="success">Employee successfully added !</Alert>
              )}
              {error && <Alert variant="danger">{errorMsg}</Alert>}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default EmployeeAdd;
