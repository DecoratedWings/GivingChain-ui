import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Link from '@mui/material/Link';
import FeedbackForm from './FeedbackForm';

export default function FeedbackModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Donation feedback</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FeedbackForm />
           
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }