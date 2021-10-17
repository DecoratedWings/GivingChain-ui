import React from 'react'
import axios from "axios";

const donorPool = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools'
class TokenService  {
    
    async createTokenPool(){
        axios.post(donorPool, 
        {
            "type": "nonfungible",
            "name": "donations"
        }).then((response) => {
            alert(JSON(response));
            console.log(response);
        })
        .catch(error=>console.log(error))
    }


}

export default TokenService
