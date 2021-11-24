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
      const querySnapshot = await getDocs(collection(db, "pawnaccounts"));
      setAccounts(
        querySnapshot.docs.map((doc) => ({ pawnNumber: doc.id, ...doc.data() }))
      );
    })();
  }, [show]);

  return (
    <div className="py-5">
      <DeleteModal
        show={show}
        setShow={setShow}
        id={id}
        collection="pawnaccounts"
      />

      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Pawning Department</h4>
            <Button variant="success" onClick={() => history.push("/pawn/add")}>
              <i className="bi bi-plus"></i>
              New Pawn Account
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
                <th>Item Type</th>
                <th>Item Value(Rs.)</th>
                <th>Duration</th>
                <th>Description</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((pawn) => (
                <tr key={pawn.pawnNumber}>
                  <td>{pawn.pawnNumber}</td>
                  <td>{pawn.pawnHolderName}</td>
                  <td>{pawn.pawnHolderAddress}</td>
                  <td>{pawn.pawnHolderMobileNo}</td>
                  <td>{pawn.pawnHolderAge}</td>
                  <td>{pawn.itemType}</td>
                  <td>{pawn.itemValue}</td>
                  <td>{pawn.duration} years</td>
                  <td>{pawn.description}</td>
                  <td align="center">
                    <i
                      className="bi bi-pencil-square"
                      role="button"
                      onClick={() => history.push(`/pawn/${pawn.pawnNumber}`)}
                    ></i>
                  </td>
                  <td align="center">
                    <i
                      className="bi bi-trash-fill"
                      role="button"
                      onClick={() => setShow(true) + setID(pawn.pawnNumber)}
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
