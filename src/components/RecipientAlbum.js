import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
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
import RecipientForm from './Forms/RecipientForm';
import AddDonation from './Forms/AddDonation';
import FeedbackModal from './Forms/FeedbackModal';
import RecipientModal from './Forms/RecipientModal';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';




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
const dataUrl = 'http://localhost:5002/api/v1/namespaces/default/tokens/erc1155/pools/donations/transfers';

function getNFTImageIds(){
    var Ids = [];
    axios.get(dataUrl)
    .then(response=>{
        console.log("response length", response.data.length)
        for(var i=0; i<response.data.length-1;i++) {
            Ids.push(response.data[i].localId);
            console.log("local Id", response.data[i].localId)
        }
        console.log(response)
    }).catch(error=>console.log(error))
    return Ids;
}


const cards = getNFTImageIds();
console.log("cards is: ", cards);


const theme = createTheme({
    palette: {
        primary: {
            main: '#ff3333'
        }
    }
});


export default function RecipientAlbum() {
    const [modalShow, setModalShow] = React.useState(false);
    const [infoModalShow, setInfoModalShow] = React.useState(false);
    const [nftModalShow, setNFTModalShow] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <EmojiPeopleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Recipient Held NFTs and Recieved Donations
          </Typography>

          <Grid item xs/>

          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={9} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        
          <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
            Recipient NFTs
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
                 <AddDonation
                     show={modalShow}
                        onHide={() => setModalShow(false)} 
                        org={'Recipient'}
                        childComponent={<RecipientForm/>}/>

                <FeedbackModal show={infoModalShow}
                    onHide={() => setInfoModalShow(false)}/>

              <Button variant="contained" onClick={() => setModalShow(true)}>Send Message</Button>
              <Button variant="outlined" onClick={() => setInfoModalShow(true)}>Rate Delivery</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="xl">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={3}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
             <CardActionArea>
                {console.log("CARD ID IS: ", card.id)}
             <RecipientModal show={nftModalShow}
                 onHide={() => setNFTModalShow(false)}
                 id={cards[cards.indexOf(card)]} />
                    {console.log("CARD IS", cards.indexOf(card))}
             
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Donation number: {cards.length-cards.indexOf(card)}
                    </Typography>
                    <Typography>
                      localId: <br/> {cards[cards.indexOf(card)]}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" onClick={()=>setNFTModalShow(true)}>View</Button>
                    {/* <Button size="small"onClick={()=>transferNFTDriver(cards.indexOf(card)+1)}>Transfer</Button> */}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
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
      {/* End footer */}
    </ThemeProvider>
  );
}