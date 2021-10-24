import React, { Component } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import axios from "axios";
import NFTUpdates from './NFTUpdates'

const baseUrl = 'http://localhost:5000/api/v1';


class NFTUpdatesCard extends Component {

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
        fetch(`${baseUrl}/namespaces/images/data/${this.props.id}/blob`)
        .then(response => {
            console.log(response)
        })
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
        
        return (
         <CardMedia image={items} />

        );
    }
}

export default NFTUpdatesCard;
