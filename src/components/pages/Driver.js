import IpfsUpload from '../ipfs-upload';
import Practice2 from '../Practice2';
import DriverUpdates from '../DriverUpdates';
import DriverAlbum from '../DriverAlbum';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardActionArea } from '@mui/material';
import { SocialIcon } from 'react-social-icons';

const theme = createTheme({
    palette: {
        primary: {
            main: '#008000'
        }
    },
    padding: '200px',
});

const Driver = () => {
    return (
    <>
  
                {/* <Practice2 /> */}
                {/* <DriverUpdates /> */}

                <DriverAlbum />
                {/* <IpfsUpload /> */}
        
    </>
    );
}

export default Driver
