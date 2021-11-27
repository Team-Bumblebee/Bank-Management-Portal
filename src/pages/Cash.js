import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import { db } from "../firebase";

const Cash = () => {
  const history = useHistory();

  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "cashaccounts"));
      setAccounts(
        querySnapshot.docs.map((doc) => ({ accNumber: doc.id, ...doc.data() }))
      );
    })();
  }, [show]);

  return (
    <div className="py-5">
      <DeleteModal
        show={show}
        setShow={setShow}
        id={id}
        collection="cashaccounts"
      />

      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Accounts Department</h4>
            <Button variant="success" onClick={() => history.push("/cash/add")}>
              <i className="bi bi-plus"></i>
              Create Cash Account
            </Button>
          </div>
        </Card>
        <Card border="success" body>
          <Table striped bordered hover>
            <thead align="center">
              <tr>
                <th>Account Number</th>
                <th>Name</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>Age</th>
                <th>Interest Rate(%)</th>
                <th>Type</th>
                <th>Account</th>
                <th>Remarks</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody align="center">
              {accounts.map((account) => (
                <tr key={account.accNumber}>
                  <td>{account.accNumber}</td>
                  <td>{account.accHolderName}</td>
                  <td>{account.accHolderAddress}</td>
                  <td>{account.accHolderMobileNo}</td>
                  <td>{account.accHolderAge}</td>
                  <td>{account.interestRate}</td>
                  <td>{account.type}</td>
                  <td>{account.accName}</td>
                  <td>{account.remarks}</td>
                  <td align="center">
                    <i
                      className="bi bi-pencil-square"
                      role="button"
                      onClick={() => history.push(`/cash/${account.accNumber}`)}
                    ></i>
                  </td>
                  <td align="center">
                    <i
                      className="bi bi-trash-fill"
                      role="button"
                      onClick={() => setShow(true) + setID(account.accNumber)}
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
