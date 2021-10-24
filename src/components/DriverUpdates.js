import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";

const baseUrl = 'http://localhost:5000/api/v1';
const messages =[];

function getMessage(id){
    console.log("hit here", id)
    var message;
    axios.get(`http://localhost:5000/api/v1/namespaces/default/messages/${id.header.id}/data`)
    .then(response=>{
        // response = response.json();
  
        message=response.data[0].value;
        messages.push(message)
        // console.log(message)
        // this.messages.push(message)
        console.log("value is", message)

    }).catch(error=>console.log(error))

    return message;
}



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

        var ids = this.state.items;
        var msgs=[];
        for(var i=0; i<ids.length-1;i++){
            msgs.push(getMessage(ids[i].header.id));
        }
        this.setState({
            messages: msgs,
        })
    }


    render() {
        console.log("item array:", this.state.items)
        console.log("message array:", this.state.messages)

        var {isLoaded, items} = this.state;
        if(!isLoaded){
            return <div>Loading ...</div>
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
                        {console.log(`Message is ${getMessage(item)}`)}
                       Message: {getMessage(item)}
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
