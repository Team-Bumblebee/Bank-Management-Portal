import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import { db } from "../../firebase";

const PawnType = (refresh) => {
  const history = useHistory();

  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [id, setID] = useState(null);

  useEffect(() => {
    (async () => {
      const docRef = query(
        collection(db, "accounttypes"),
        where("category", "==", "pawn")
      );
      const querySnapshot = await getDocs(docRef);
      setAccounts(
        querySnapshot.docs.map((doc) => ({ accNumber: doc.id, ...doc.data() }))
      );
    })();
  }, [show, refresh]);

  return (
    <div className="py-3">
      <DeleteModal
        show={show}
        setShow={setShow}
        id={id}
        collection="accounttypes"
      />

      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Pawn Account Types</h4>
            <Button
              variant="success"
              onClick={() => history.push("/pawnType/add")}
            >
              <i className="bi bi-plus"></i>
              Create Pawn Account Type
            </Button>
          </div>
        </Card>
        <Card border="success" body>
          <Table striped bordered hover>
            <thead align="center">
              <tr>
                <th>Account Type ID</th>
                <th>Name</th>
                <th>Max Value(Rs.)</th>
                <th>Age Group(years)</th>
                <th>Interest Rate(%)</th>
                <th>Remarks</th>
                <th colSpan={2}></th>
              </tr>
            </thead>
            <tbody align="center">
              {accounts.map((account) => (
                <tr key={account.accNumber}>
                  <td>{account.accNumber}</td>
                  <td>{account.accName}</td>
                  <td>{account.maxVal}</td>
                  <td>{account.ageGroup}</td>
                  <td>{account.interestRate}</td>
                  <td>{account.remarks}</td>
                  <td align="center">
                    <i
                      className="bi bi-pencil-square"
                      role="button"
                      //   onClick={() => history.push(`/pawnType/${account.accNumber}`)}
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

export default PawnType;
