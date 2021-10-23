import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Admin = () => {
    const donorPool = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools'
    const mintUrl = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools/donations/mint';
    const nsCreate = 'http://localhost:5000/api/v1/namespaces';
    const namespaces= 'http://localhost:5000/api/v1/namespaces';

    function createTokenPool() {
        axios.post(donorPool,
            {
                "type": "nonfungible",
                "name": "donations"
            }).then(response => console.log(response))
            .catch(error => console.log(error))
    }

    function viewTokenPool() {
        axios.get(donorPool)
            .then(response => {
                alert(`\nPool Name: ${response.data[0].name} 
                \nPool Type: ${response.data[0].type}
                \nPool Id: ${response.data[0].id}`)
                console.log(response)
            })
            .catch(error => console.log(error))
    }

    function viewNamespaces(){
        var info=[];
        axios.get(namespaces)
        .then(response=>{
            for(var i=0; i<response.data.length; i++){
                info.push(`\nNS: ${response.data[i].name}`)
                info.push(`\nDescription: ${response.data[i].description}`)
                info.push('\n---------------------------')
            }
            alert(info.toString())
            console.log(response)
        })
    }

    function mintNFT() {
        //ToDo: Add Message->data->id when available from ff 
        axios.post(mintUrl,
            {
                "amount": 1
            })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    function createNameSpace(ns, description){
        axios.post(nsCreate, 
            {
                "description": `${description}`,
                "name": `${ns}`
              }
        ).then(response=>response.console.log(response))
        .catch(error=>console.log(error))
    }
    return (

        <>
            <h1 style={{ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh'}}>Admin</h1>

            <h4 style={{ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '10vh'}}>Create erc1155 Token pool for demo</h4>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '2vh'
            }}>


                <Button variant="primary" onClick={() => createTokenPool()}>
                    Create Token Pool
             </Button>
            &nbsp;
    <Button variant="info" onClick={() => viewTokenPool()}>
                    View Token Pools
    </Button>{' '}
            </div>


            <h4 style={{ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '12vh'}}>Mint tokens </h4>
            {/* //ToDo: add buttons for admin as needed */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '0vh'
            }}>

                <Button variant="primary" onClick={() => mintNFT()}>
                    Mint Token
            </Button>

            </div>

            <h4 style={{ display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '12vh'}}>Create Namespaces for demo</h4>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '0vh'
            }}>
                <Button variant="primary" onClick={() => createNameSpace('images', 'NFT Upload Images namespace')}>
                    Image NS
                </Button>
                &nbsp;
                <Button variant="primary" onClick={() => createNameSpace('private', 'NS for Private messages')}>
                    Private Message Donor
                </Button>
                &nbsp;
                <Button variant="info" onClick={() => viewNamespaces()}>
                    View Namespaces
                </Button>{' '}

            </div>

        </>
    )
}

export default Admin;