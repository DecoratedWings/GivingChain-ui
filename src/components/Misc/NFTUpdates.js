import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import NFTUpdatesCard from './NFTUpdatesCard';
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/v1';


class DriverUpdates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
            images: [],
        };
    }

    componentDidMount() {
        var images = [];
        fetch(`${baseUrl}/namespaces/images/data`)
        .then(response => response.json())
        // .then(json => console.log(json))
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
            json.forEach(item=> {
                fetch(`${baseUrl}/namespaces/images/data/${item.id}/blob`)
                .then(response=> {
                    console.log(response)
                    images.push(response)
                })
                .catch(error=>console.log(error))
            })
            this.setState({
                images:images,
            })
        });
    }


    render() {

        var {isLoaded, items, images} = this.state;
        if(!isLoaded){
            return <div>Loading ...</div>
        }

        function getNFTImages(item){
                // fetch(`${baseUrl}/namespaces/images/data/${item.id}/blob`)
                // .then(response => {

                //     var blob;
                //     var binaryData = [];
                //     binaryData.push(response);
                //     blob = window.URL.createObjectURL(new Blob(binaryData, {type: "application/zip"}))
                //     // updateData(blob)
                //     images.push(blob)
                //     console.log(blob)
                // })
                // .catch(error=>console.log(error))
                axios({
                    url: `${baseUrl}/namespaces/images/data/${item.id}/blob`,
                    method: 'GET',
                    responseType: 'blob', // important
                  }).then((response) => {
                    // const url = window.URL.createObjectURL(new Blob([response.data]));
                    images.push(response)
                    console.log(response)
                    // const link = document.createElement('a');
                    // link.href = url;
                    // link.setAttribute('download', 'file.pdf');
                    // document.body.appendChild(link);
                    // link.click();
                  });
        }

        
        return (
            <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '1vh',
            margin: '2px',
            marginTop: '1px'}}>          
               {console.log("Data has been loaded")}
        
                <ul  style={{marginTop: "750px", padding: "1px", position: "center"}}>
                {items.map(item => (
             
                <Card sx={{ maxWidth: 845, margin: 1}}>
                    <CardActionArea>
                        {getNFTImages(item.id)}
                        {console.log("IMAGES IS", images)}

                        <NFTUpdatesCard id={item.id} />
                    {/* <CardMedia 
                      //Pass images dynamically too!
                      
                      image={null}
                      // title="Contemplative Reptile"
                      /> */}

                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {/* Message Id: {item.id} */}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       
                    {/* <li key={item.id} > */}
                        {/* {item.created} | {item.description}
                        {item.message} | {item.name}
                        {item.id} | {item.type} */}
                        {/* Timestamp: {item.header.confirmed} */}
                        <ul>
                        <br/>
                       {/* Type: {item.header.type}  */}
                       <br/> 
                       {/* Version Data: {item.value.owner} */}
                        {/* {console.log(item.value.dx)} */}
                        {/* <li>{check(item)}</li> */}
                        </ul>
                        <br/>
                    {/* </li> */}
                        </Typography>
                     </CardContent>
                 </CardActionArea>
                <CardActions>
                 <Button size="small" color="primary" onClick={null}>
                    Send Message
                </Button>
            </CardActions>
        </Card>

                ))}
                </ul>
                </div>
        );
    }
}

export default DriverUpdates;
