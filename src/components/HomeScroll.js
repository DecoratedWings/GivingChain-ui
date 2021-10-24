import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import ImageCard from './ImageCard';
// import places from '../static/places';
import useWindowPosition from './hooks/useWindowPosition.js';
import HomeCard from './HomeCard';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import SortIcon from '@material-ui/icons/Sort';
import princeton from './images/princeton.jpg';
import ukat from './images/ukat.png';
import women from './images/women.png';


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '0vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  projTitle: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  }
}));
export default function HomeScroll() {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
      <>
    <h1 style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '20vh'
        }}>Projects</h1>
    <div className={classes.root} id="place-to-visit">


      <HomeCard  checked={checked} img={princeton} proj={'Princeton'} 
      description={'This project is based in the tri-state area of the United States. Donations from food drives and surplus produce from Jersey farmers will be distributed to local food banks. The aim is to combat hunger locally for families and individuals in need. This urgency has been amplified due to the effects of the COVID-19 pandemic. The initiative follows the local charity giving model and has been in effect since 2019.'}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <HomeCard  checked={checked} img={ukat} proj={'Uttarakhand'} description={'Localized to the Uttarakhand area of India, this project’s purpose is to aid local farmers who have been impacted by flooding. For farmers in this region, donations are vital as their sole livelihood has suffered.'}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <HomeCard  checked={checked} img={women} proj={'Women'} description={'A women’s crisis is a humanitarian crisis. Women in India across many regions are in dire need of sanitary products. Ongoing efforts have been made in the past, but distributed ledger technology increases the assurance of women receiving the help that they need.'}/>

    </div>
    </>
  );
}