import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';


export default function AddDonation(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Giving Chain Donor Submission Form:</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {props.childComponent}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close </Button>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }