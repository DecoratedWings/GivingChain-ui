import React, {useEffect, useState} from 'react'
import Highway from '../video/Highway.mp4'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import HomeScroll from '../HomeScroll.js'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { SocialIcon } from 'react-social-icons';
import FF from '../images/ffLogo.png'


const useStyles = makeStyles(() => ({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      fontFamily: 'Nunito',
    },
    appbar: {
      background: 'none',
    },
    appbarWrapper: {
      width: '80%',
      margin: '0 auto',
    },
    appbarTitle: {
      flexGrow: '1',
    },
    icon: {
      color: '#fff',
      fontSize: '2rem',
    },
    colorText: {
      color: '#5AFF3D',
    },
    container: {
      textAlign: 'center',
    },
    title: {
      color: '#fff',
      fontSize: '4.5rem',
    },
    goDown: {
      color: '#5AFF3D',
      fontSize: '4rem',
    },
  }));

  function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://thegivingchain.org/index.html">
          The Giving Chain
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const Home = () => {

    const classes = useStyles();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, [])

    return (
            <>
            <video autoPlay loop muted
            style={{
                position:"absolute",
                width:"100%",
                left:"50%",
                top:"50%",
                height:"100%",
                objectFit:"cover",
                transform:"translate(-50%, -50%)",
                zIndex: "-1"
            }}>
                <source src={Highway} type="video/mp4" />
            </video>


    <div className={classes.root} id="header">

            <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
          
        <div className={classes.container}>
          <h1 className={classes.title}>
            Blockchain Powering <br />
            <span className={classes.colorText}>Generosity.</span>
          </h1>
          <Scroll to="place-to-visit" smooth={true}>
            <IconButton>
              <ExpandMoreIcon className={classes.goDown} />
            </IconButton>
          </Scroll>
        </div>
      </Collapse>
    </div>

        <HomeScroll />
        
         {/* Footer */}

      <Box sx={{ bgcolor: 'background.paper', p: 16 }} component="footer">
          <h4>Powered by</h4>
      <img src={FF} alt='firefly  logo' style={{justifyContent: 'center', align:'center',
                alignItems: 'center', width:'20%', height:'20%', display: 'flex'}}/>
        <Typography variant="h6" align="center" gutterBottom>
            
        <SocialIcon url="https://www.facebook.com/TheGivingChain/" network="facebook" style={{ height: 50, width: 50 }} />
        &nbsp;
        <SocialIcon url="https://www.instagram.com/thegivingchain/" network="instagram" style={{ height: 50, width: 50 }} />
        &nbsp;      
        <SocialIcon url="https://t.me/BCPrinceton" network="telegram" style={{ height: 50, width: 50 }} />
        &nbsp;         
        <SocialIcon url="https://twitter.com/bc_princeton" network="twitter" style={{ height: 50, width: 50 }} />
        &nbsp;   
        <SocialIcon url="https://www.linkedin.com/groups/9055378/" network="linkedin" style={{ height: 50, width: 50 }} />

        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.black"
          component="p"
        >
          Blockchain Powering Generosity
        </Typography>
        <Copyright />
        
      </Box>
      
         </>
    )
}

export default Home;
