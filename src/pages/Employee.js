import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { db } from "../firebase";

const Employee = () => {
  const history = useHistory();

  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "employees"));
      setEmployeeDetails(
        querySnapshot.docs.map((doc) => ({ empId: doc.id, ...doc.data() }))
      );
    })();
  }, [show]);

  return (
    <div className="py-5">
      <DeleteModal
        show={show}
        setShow={setShow}
        id={id}
        collection="employees"
      />

      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>
              Administrative Department
            </h4>
            <Button
              variant="success"
              onClick={() => history.push("/employee/add")}
            >
              <i className="bi bi-plus"></i>
              Add Employee
            </Button>
          </div>
        </Card>
        <Card border="success" body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Position</th>
                <th>Salary</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {employeeDetails.map((employee) => (
                <tr key={employee.empId}>
                  <td>{employee.empId}</td>
                  <td>{employee.name}</td>
                  <td>{employee.address}</td>
                  <td>{employee.mobileNo}</td>
                  <td>{employee.age}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.email}</td>
                  <td>{employee.position}</td>
                  <td>{employee.salary}</td>
                  <td align="center">
                    <i
                      className="bi bi-pencil-square"
                      role="button"
                      onClick={() =>
                        history.push(`/employee/${employee.empId}`)
                      }
                    ></i>
                  </td>
                  <td align="center">
                    <i
                      className="bi bi-trash-fill"
                      role="button"
                      onClick={() => setShow(true) + setID(employee.empId)}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default Employee;
