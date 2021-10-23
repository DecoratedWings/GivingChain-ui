import React, {useEffect, useState} from 'react'
import Highway from '../video/Highway.mp4'
import HL from '../images/HL.jpg'
import FF from '../images/ffLogo.png'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import SortIcon from '@material-ui/icons/Sort';


const useStyles = makeStyles((theme) => ({
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


            {/* <Collapse in={checked} 
            {...(checked ? {timeout: 1000} : {})}
            // collapsedHeight={15}
            > */}

            {/* <div style={{
                margin:"20vh"
            }}> */}
            {/* <h1 style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '20vh',
                color:"white",
                // margin:"20vh"
            }}>Blockchain Powering Generosity</h1> */}
             {/* <Toolbar className={classes.appbarWrapper}>
          <h1 className={classes.appbarTitle}>
            My<span className={classes.colorText}>Island.</span>
          </h1>
          <IconButton>
            <SortIcon className={classes.icon} />
          </IconButton>
        </Toolbar>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // height: '30vh',
                color:"white",
                // margin:"20vh"
            }}>
 
           {/* <img src={HL} alt="Logo" />; */}
         
           {/* </div>
           </div>
           </Collapse> */}

</div>

         </>
    )
}

export default Home
