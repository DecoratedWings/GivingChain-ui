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


      <HomeCard  checked={checked} /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <HomeCard  checked={checked} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <HomeCard  checked={checked} />

    </div>
    </>
  );
}