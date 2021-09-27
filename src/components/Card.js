import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/v1/namespaces/default/messages/broadcast';
const msgUrl = 'http://localhost:5000/api/v1/namespaces/default/data';
const privateMsgUrl = 'http://localhost:5000/api/v1/namespaces/default/messages/private'


export default function NFTCard(props) {

    const [post, setPost] = React.useState(``);
    const [mint, setMint] = React.useState(``);
    const [error, setError] = React.useState(``);

    async function mintNFT() {
        setMint(null)
        axios.post(msgUrl,
            {
                // "blob": {
                //   "hash": file,
                //   "public": "string"
                // },
                // "datatype": {
                //   "name": "Donation-NFT"
                // },
                "value": props.img
                // "hash" : file

            }).then(response => {
                console.log(response)
                setMint(response.data.hash)
                console.log(response.data.id)
                alert(`Minted NFT with Id: ${response.data.id}`)
            }).catch(error => {
                setError(error)
                console.log(error)
            })
        console.log("mint is: ")
        console.log(mint)
    }

    async function sendBroadCast(file) {

        if (mint) {
            console.log("NFT MINTED, ALLOW BROADCAST", mint.id)
            axios.post(baseUrl,
                {
                    "data": [
                        {
                            "value": "Donation ready for Pickup!"
                        }

                    ]

                }).then((response) => {
                    setPost(response);
                    setMint(null)
                    alert(`Message has been Broadcasted! Transaction Id is: ${response.data}`)
                    console.log("broadcast response is: ",response)
                }).catch(error => {
                    setError(error)
                    console.log(error)
                })
                
            console.log("post is: ", post)
            axios.get(`${msgUrl}/${post.id}`)
                .then(response => {
                    alert(`txn id is: ${response}`)
                    console.log("message response is", response)
                }).catch(error => {
                    setError(error)
                    console.log(error)
                })
            // post(`/namespaces/default/broadcast/message`, { data })
        } else {
            alert('User Must First Mint the Donation NFT!')
        }
    }

    function sendMessageDriver(){
        axios.post(privateMsgUrl, {
            "data": [
              {
                "value": "HIIII!"
              }
            ],
            "group": {
              "members": [
                {
                  "identity": "0x0c0480d07aad13b85ca23e778df539c423a243af"
                }
              ]
            },
            "header": {
                "txtype": "none"
            }
          }).then(response => {console.log("response for private msg is:",response)})
          .catch(error=>{console.log("error for private msg:",error)})
    }


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={props.img}
                    alt="N/A"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Donation- NFT
          </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User would input a description of the item and any other pertinent
                        information that they would like to share with the network.
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => mintNFT(props.img)}>
                    Mint
             </Button>
                <Button size="small" color="primary" onClick={() => sendBroadCast(props.img)}>
                    Broadcast
             </Button>
                <Button size="small" color="primary" onClick={() => sendMessageDriver()}>
                    Send Pickup Location
             </Button>
            </CardActions>

        </Card>
    );
}