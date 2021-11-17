import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import DeleteModal from "../components/DeleteModal";

const Cash = () => {
  const history = useHistory();

  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "cashaccounts"));
      setAccounts(
        querySnapshot.docs.map((doc) => ({ accNumber: doc.id, ...doc.data() }))
      );
    })();
  }, []);

  return (
    <div className="py-5">
      <DeleteModal show={show} setShow={setShow} />
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
                <th>Mobile</th>
                <th>Age</th>
                <th>Interest Rate</th>
                <th>Type</th>
                <th>Remarks</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.accNumber}>
                  <td>{account.accNumber}</td>
                  <td>{account.accHolderName}</td>
                  <td>{account.accHolderAddress}</td>
                  <td>{account.accHolderMobileNo}</td>
                  <td>{account.accHolderAge}</td>
                  <td>{account.interestRate}</td>
                  <td>{account.type}</td>
                  <td>{account.remarks}</td>
                  <td align="center">
                    <i className="bi bi-pencil-square" role="button"></i>
                  </td>
                  <td align="center">
                    <i
                      className="bi bi-trash-fill"
                      role="button"
                      onClick={() => setShow(true)}
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

export default Cash;
