import React from 'react'
import Practice2 from '../Practice2'
import DonorForm from '../Forms/DonorForm'
import axios from 'axios';
import Button from 'react-bootstrap/Button';


const donorPool = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools'

const Home = () => {

    function createTokenPool(){
        axios.post(donorPool, 
        {
            "type": "nonfungible",
            "name": "donations"
        }).then(response => console.log(response))
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

    return (
            <>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh'
        }}>
            
            <h1>Home</h1>
            <br/>            
            <br/>
            <br/>
            </div>
      
            <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '10vh'
                }}>
             

            <Button variant="primary" onClick={()=>createTokenPool()}>
              Create Token Pool                    
            </Button>
  
          
                </div>
           
         </>
    )
}

export default Home
