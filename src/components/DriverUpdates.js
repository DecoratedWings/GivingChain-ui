import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/v1';


class DriverUpdates extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        //http://localhost:5000/namespaces

        // fetch('https://jsonplaceholder.typicode.com/todos/1')
        fetch(`${baseUrl}/namespaces/default/messages`)
        .then(response => response.json())
        // .then(json => console.log(json))
        .then(json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        });

    }


    render() {

        var {isLoaded, items} = this.state;
        if(!isLoaded){
            return <div>Loading ...</div>
        }
        function check(item){
            if(item.value.dx) {
              return<div>Item: {item.value.dx.peer}</div>
            }
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
              
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Message Id: {item.header.id}
                     </Typography>
                     <Typography variant="body2" color="text.secondary">
                       
                    {/* <li key={item.id} > */}
                        {/* {item.created} | {item.description}
                        {item.message} | {item.name}
                        {item.id} | {item.type} */}
                        Timestamp: {item.confirmed}
                        <ul>
                        <br/>
                       Type: {item.header.type} 
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
