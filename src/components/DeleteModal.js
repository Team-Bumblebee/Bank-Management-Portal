import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const DeleteModal = ({ show, setShow, id, collection }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [confirmShow, setconfirmShow] = useState(false);

  const deleteEntry = async () => {
    try {
      await deleteDoc(doc(db, collection, id)); //without account number decrement
      setconfirmShow(true);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {confirmShow ? "Succefully Deleted!" : "Warning!"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {confirmShow
            ? `${id} has been deleted`
            : `Are you sure you want to delete ${id}?`}
        </Modal.Body>
        {confirmShow ? (
          <Modal.Footer>
            <Button
              variant="success"
              onClick={() => setShow(false) + setconfirmShow(false)}
            >
              Ok
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteEntry}>
              Delete
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default DeleteModal;
