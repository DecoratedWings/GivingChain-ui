import React from 'react'
import axios from "axios";


const msgUrl = 'http://localhost:5000/api/v1/namespaces/default/data';
const privateMsgUrl = 'http://localhost:5000/api/v1/namespaces/default/messages/private'


class MessageService {

    async broadcastMessage(port, ns, nftId, txnId){
         axios.post(`http://localhost:${port}/api/v1/namespaces/${ns}/messages/broadcast`,
            {
                "data": [
                    {
                        "value": `NFT with token Id ${nftId} and txnId ${txnId} 
                        has been donated and is ready for pickup!`
                    }
                ]

            })
              .then(response => JSON(response))
              .catch(error => console.log(error))
    }




}

export default MessageService;
