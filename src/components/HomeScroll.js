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
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
export default function HomeScroll() {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.root} id="place-to-visit">
      <HomeCard  checked={checked} />
      <HomeCard  checked={checked} />
      <HomeCard  checked={checked} />

    </div>
  );
}