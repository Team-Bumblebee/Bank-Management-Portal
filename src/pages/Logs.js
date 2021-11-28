import compareDesc from "date-fns/compareDesc";
import format from "date-fns/format";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Accordion, Button, Card, Container, Table } from "react-bootstrap";
import { db } from "../firebase";
import isEqual from "date-fns/isEqual";

const Logs = () => {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [logs, setLogs] = useState([]);
  const [logView, setLogView] = useState([]);

  const filterDates = (e) => {
    setDate(e.target.value);
    setLogView(
      logs.filter((log) =>
        compareWithoutTime(log.timestamp.toDate(), new Date(e.target.value))
      )
    );
  };

  const compareWithoutTime = (left, right) => {
    left.setHours(0, 0, 0, 0);
    right.setHours(0, 0, 0, 0);
    return isEqual(left, right);
  };

  useEffect(() => {
    (async () => {
      const snap = await getDocs(collection(db, "logs"));
      const logArr = snap.docs
        .map((doc) => doc.data())
        .sort((a, b) =>
          compareDesc(a.timestamp.toDate(), b.timestamp.toDate())
        );
      setLogs(logArr);
      setLogView(
        logArr.filter((log) =>
          compareWithoutTime(log.timestamp.toDate(), new Date())
        )
      );
    })();
  }, []);

  return (
    <div className="py-5">
      <Container>
        <Card border="success" className="mb-2" body>
          <div className="d-flex justify-content-between">
            <h4 style={{ color: "darkolivegreen" }}>Log Records</h4>
            <input
              type="date"
              name="date"
              value={date}
              onChange={filterDates}
            ></input>
          </div>
        </Card>
        <Card border="success" body>
          <Accordion>
            {logView.length !== 0 &&
              logView.map((log, idx) => {
                const { id, ...values } = log.data;
                const color =
                  log.type === "create"
                    ? "success"
                    : log.type === "update"
                    ? "primary"
                    : "danger";
                return (
                  <Accordion.Item eventKey={idx} key={idx}>
                    <Accordion.Header>
                      Document has been &nbsp;
                      <Button variant={color}>{log.type}d</Button>
                      &nbsp;
                      {`with ID: ${id} at ${format(
                        log.timestamp.toDate(),
                        "HH:mm"
                      )}`}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th colSpan={3} className="text-center">
                              {id}
                            </th>
                          </tr>
                          {log.type === "update" && (
                            <tr className="text-center">
                              <th></th>
                              <th>Old Entry</th>
                              <th>New Entry</th>
                            </tr>
                          )}
                        </thead>
                        <tbody>
                          {log.data &&
                            Object.entries(values).map(([key, value]) => (
                              <tr key={key}>
                                <td>{key}</td>
                                <td className="text-center">{value}</td>
                                {log.type === "update" && (
                                  <td className="text-center">
                                    {log.newData[key]}
                                  </td>
                                )}
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        </Card>
      </Container>
    </div>
  );
};

export default Logs;
