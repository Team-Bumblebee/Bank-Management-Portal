import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { db } from "../firebase";

const DeleteModal = ({ show, setShow, id, collection }) => {
  const [loading, setLoading] = useState(false);
  const [confirmShow, setconfirmShow] = useState(false);

  const handleClose = () => setShow(false);

  const deleteEntry = async () => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, collection, id));
      setconfirmShow(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={() => handleClose() + setconfirmShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton={!loading}>
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
              onClick={() => handleClose() + setconfirmShow(false)}
            >
              Ok
            </Button>
          </Modal.Footer>
        ) : (
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Close
            </Button>
            <Button variant="danger" onClick={deleteEntry} disabled={loading}>
              {loading ? (
                <>
                  Deleting...&nbsp;
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </Modal.Footer>
        )}
      </Modal>
    </div>
  );
};

export default DeleteModal;
