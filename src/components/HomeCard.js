import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { Collapse } from '@material-ui/core';

  

export default function HomeCard(props) {
 
    return (

        <Collapse in={props.checked} {...(props.checked ? { timeout: 1000 } : {})}>
          <Grid container spacing={-1}>
        
        <Card sx={{ maxWidth: 545 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="440"
                    image={props.img}
                    alt="N/A"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        Project {props.proj}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                       {props.description}
          </Typography>
                </CardContent>
            </CardActionArea>
        

        </Card>
        </Grid>
    </Collapse>

    );
}