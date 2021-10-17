import React from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const Admin = () => {
    const donorPool = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools'
    const mintUrl = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools/donations/mint';

    function createTokenPool() {
        axios.post(donorPool, 
        {
            "type": "nonfungible",
            "name": "donations"
        }).then(response => console.log(response))
        .catch(error=>console.log(error))
    }

    function viewTokenPool() {
        axios.get(donorPool)
            .then(response=>{
                alert(`\nPool Name: ${response.data[0].name} 
                \nPool Type: ${response.data[0].type}
                \nPool Id: ${response.data[0].id}`)
                console.log(response)
            })
            .catch(error=>console.log(error))
    }
    //DATA:
//     data:
// id: "2f708b6e-b85c-46b2-ba50-c4053a0ef75e"
// key: "0x4ee0f6012f301f6d589ee99049e5dc3b171401d9"
// name: "donations"
// namespace: "default"
// tx:
// id: "5effeba5-134f-4683-b53e-75e8ade8233f"
// type: "token_pool"
// [[Prototype]]: Object
// type: "nonfungible"

function mintNFT() {
    //ToDo: Add Message->data->id when available from ff 
    axios.post(mintUrl, 
      {
        "amount": 1
      })
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
  
  }
    return (
        
        <>
         <h1>Admin</h1>

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh'
        }}>
    
   
    <Button variant="primary" onClick={()=>createTokenPool()}>
      Create Token Pool                    
    </Button>
    &nbsp;
    <Button variant="info" onClick={()=>viewTokenPool()}>
        View Token Pools
    </Button>{' '}
    </div>

    {/* //ToDo: add buttons for admin as needed */}
    <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh'
        }}>

<Button variant="primary" onClick={()=>mintNFT()}>
      Mint Token                
    </Button>
        
    </div>

    </>
    )
}

export default Admin;