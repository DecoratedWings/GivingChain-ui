import React from 'react'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const NFTCardV2 = () => {

    const dataUrl = 'http://localhost:5000/api/v1/namespaces/images/data';

    const [data, setData] = React.useState(``);
    const [error, setError] = React.useState(``);

    function getNFTs(){
        axios.post(dataUrl)
            .then(response=>{
                console.log(response);
                setData(response);
            }).catch(error=>{
                console.log(error)
                setError(error)
            })
    }


const useStyles = makeStyles((theme)=>({
    root: {
      maxWidth: 345,
      display: "inline-block"
    },
    media: {
      height: 140,
    },
  }));
  

  const classes = useStyles();

    return (
        <Card className={classes.root}>
        {/* Implement logic to link to slideshow for users rather than redirect to website!: */}
        <CardActionArea  onClick={null}>
          <CardMedia
            className={classes.media}
            //Pass images dynamically too!
            image={null}
            // title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {/* {props.cause} */}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {/* {props.description} */}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {/* {      //Dynamically reference links! } */}
          <Button size="small" color="primary" onClick={null}>
            Launch
          </Button>
          <Button size="small" color="primary" >
            Learn More
          </Button>
        </CardActions>
      </Card>
    )
}

export default NFTCardV2;
