import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';




export default function NFTModal(props) {

    const [info, setInfo] = React.useState(``);
    

    function getDonationPrivateDetails(id){
        console.log("ID PASSED IN IS", id)
        var info;
        axios.get(`http://localhost:5001/api/v1/namespaces/ngoRequests/data/${id}`)
        .then(response=>{
            console.log("data RESPONSE IS",response.data.value.Message)
            setInfo(JSON.stringify(response.data.value.Message, null, 2))
            info = JSON.stringify(response.data.value.Message, null, 2)
        }).catch(error=>console.log(error))
        console.log("info is: ", info)
        return <div><pre>{info}</pre></div>;
    }

    

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>Donation Details</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
           {/* This NFT Currently Belongs to: 
           "Dummy account need to add logic" */}
           {getDonationPrivateDetails(props.id)}
           {/* {console.log("PROPS VALUE", props.value)} */}
           {info}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    );
  }