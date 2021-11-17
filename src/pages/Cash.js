import React from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Cash = () => {
  const history = useHistory();
  return (
    <div className="py-5">
      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-end">
            <Button variant="success" onClick={() => history.push("/cash/add")}>
              Create Cash Account
            </Button>
          </div>
        </Card>
        <Card border="success" body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Address</th>
                <th>Number</th>
                <th>Age</th>
                <th>Interest Rate</th>
                <th>Type</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>Chamal</td>
                <td>Moratuwa</td>
                <td>0786705750</td>
                <td>23</td>
                <td>12</td>
                <td>Current</td>
                <td>Good</td>
                <td>
                  <i className="bi bi-pencil-square" role="button"></i>
                </td>
                <td>
                  <i className="bi bi-trash-fill" role="button"></i>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card>
      </Container>
    </div>
  );
};

export default Cash;
