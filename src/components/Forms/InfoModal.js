import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import Link from '@mui/material/Link';


export default function InfoModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Giving Chain NFTs</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            NFT Donations are leveraged to promote transparency and certainty in the charity model.
            As a donor you are empowered to have full traceability of immutabile on chain data.
            Please select 'add donation' and enter relevant details. contribution upon submission.
            For more information please see the following Linux Foundation article: &nbsp; 
            <Link href='https://www.hyperledger.org/blog/2021/08/25/the-giving-chain-blockchain-powering-generosity'>
             Blockchain Powering Generosity
            </Link>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }