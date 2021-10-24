import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';




const useStyles = makeStyles({
    root: {
      maxWidth: 645,
      background: 'rgba(0,0,0,0.5)',
      margin: '20px',
    },
    media: {
      height: 440,
    },
    title: {
      fontFamily: 'Nunito',
      fontWeight: 'bold',
      fontSize: '2rem',
      color: '#fff',
    },
    desc: {
      fontFamily: 'Nunito',
      fontSize: '1.1rem',
      color: '#ddd',
    },
  });
  

export default function HomeCard(props) {
    const classes = useStyles();
 
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