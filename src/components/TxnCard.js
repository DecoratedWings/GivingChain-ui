import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/v1/namespaces/default/messages/broadcast';
const msgUrl = 'http://localhost:5000/api/v1/namespaces/default/data';


export default function TxnCard(props) {


    const [error, setError] = React.useState(``);

    async function mintNFT(file) {
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
                    setPost(response.data);
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
                  {props.}
          </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={null}>
                    Send Pickup Message
               </Button>
            </CardActions>

        </Card>
    );
}