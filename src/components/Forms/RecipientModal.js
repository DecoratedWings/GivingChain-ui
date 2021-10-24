import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const messageUrl = 'http://localhost:5001/api/v1/namespaces/default/data';
const transferLookupUrl = 'http://localhost:5002/api/v1/namespaces/default/tokens/erc1155/pools/donations/transfers?localid=';



export default function RecipientModal(props) {

    const [info, setInfo] = React.useState(``);
    

    function getDonationPrivateDetails(id){
        console.log("ID PASSED IN IS", id)
        var info;
        axios.get(`${messageUrl}/${id}`)
        .then(response=>{
            console.log("data RESPONSE IS",response)
            setInfo(JSON.stringify(response.data.value, null, 2))
            info = JSON.stringify(response.data.value, null, 2)
        }).catch(error=>console.log(error))
        console.log("info is: ", info)
        return <div><pre>{info}</pre></div>;
    }

    function getSpecificNFTDetails(localId) { 
        console.log("URL IS ", `${transferLookupUrl}${localId}`)
        axios.get(`${transferLookupUrl}${localId}`)
        .then(response=>{
            console.log("response from specific details", response)
            return response.data.to;
        }).catch(error=>console.log(error))
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
        {/* //TODO: this part needs to be fixed + retrieved from db instead */}
        <Modal.Body>
           This NFT Currently Belongs to: 
           "Driver"
           {getSpecificNFTDetails(props.id)}
           {/* {getDonationPrivateDetails(props.id)} */}
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