import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { db } from "../firebase";

const Loan = () => {
  const history = useHistory();

  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "loanaccounts"));
      setAccounts(
        querySnapshot.docs.map((doc) => ({ loanNumber: doc.id, ...doc.data() }))
      );
    })();
  }, [show]);

  return (
    <div className="py-5">
      <DeleteModal
        show={show}
        setShow={setShow}
        id={id}
        collection="loanaccounts"
      />

      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Loan Department</h4>
            <Button variant="success" onClick={() => history.push("/loan/add")}>
              <i className="bi bi-plus"></i>
              New Loan Account
            </Button>
          </div>
        </Card>
        <Card border="success" body>
          <Table striped bordered hover>
            <thead align="center">
              <tr>
                <th>Account ID</th>
                <th>Loan Holder's Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Loan Name</th>
                <th>Loan Rate</th>
                <th>Duration</th>
                <th>Description</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody align="center">
              {accounts.map((loan) => (
                <tr key={loan.loanNumber}>
                  <td>{loan.loanNumber}</td>
                  <td>{loan.loanHolderName}</td>
                  <td>{loan.loanHolderAddress}</td>
                  <td>{loan.loanHolderMobileNo}</td>
                  <td>{loan.loanHolderAge}</td>
                  <td>{loan.amount}</td>
                  <td>{loan.accType}</td>
                  <td>{loan.accName}</td>
                  <td>{loan.loanRate}</td>
                  <td>{loan.duration} years</td>
                  <td>{loan.description}</td>
                  <td align="center">
                    <i
                      className="bi bi-pencil-square"
                      role="button"
                      onClick={() => history.push(`/loan/${loan.loanNumber}`)}
                    ></i>
                  </td>
                  <td align="center">
                    <i
                      className="bi bi-trash-fill"
                      role="button"
                      onClick={() => setShow(true) + setID(loan.loanNumber)}
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

export default Loan;
