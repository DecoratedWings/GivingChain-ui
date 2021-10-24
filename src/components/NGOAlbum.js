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
import AddDonation from './Forms/AddDonation';
import InfoModal from './Forms/InfoModal';
import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import BusinessIcon from '@mui/icons-material/Business';
import NGOForm from './Forms/NGOForm.js';
import NGORequestsModal from './Forms/NGORequestModal.js'



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
const dataUrl = 'http://localhost:5000/api/v1/namespaces/ngoRequests/data';
const driverTransferUrl = 'http://localhost:5000/api/v1/namespaces/default/tokens/erc1155/pools/donations/transfers';

function getNFTImageIds(){
    var Ids = [];
    axios.get(dataUrl)
    .then(response=>{
        console.log("response length", response.data.length)
        for(var i=0; i<response.data.length;i++) {
            Ids.push(response.data[i]);
            console.log(response[i])
        }
        console.log(response)
    }).catch(error=>console.log(error))
    return Ids;
}

function transferNFTDriver(index){
    axios.post(driverTransferUrl, {
        "to": "0x7fa933448ae2b28815007b24f1e0b06adacecdb7",
        "tokenIndex": `${index}`,
        "amount": 1
    }).then(response=> {
        console.log(response);
        console.log(`data: ${response.data.type}`)
        if(response.data.type==='transfer')
            alert("The NFT was transfered to the driver successfully!");
    }).catch(error=>console.log(error))
}

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const cards = getNFTImageIds();
console.log("cards is: ", cards);
// document.body.style.backgroundColor = "#008000";


const theme = createTheme({
    palette: {
        primary: {
            main: '#FDDA0D'
        }
    }
});

//ToDo: create functionality to delete card
function deleteCard(id){
    cards.splice(id,1);
}


export default function NGOAlbum() {
    const [modalShow, setModalShow] = React.useState(false);
    const [infoModalShow, setInfoModalShow] = React.useState(false);
    const [nftModalShow, setNFTModalShow] = React.useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            NGO Request Donation
          </Typography>

          <Grid item xs/>

          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={2} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        
          <IconButton
          size="large"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
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
              Organization Donation Requests
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Please Fill out the form in order to request a specific contribution from
              donors. Requests are broadcasted to the network. Private details are shared 
              between entities as necessary upon the confirmation of the donation.
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
                        org={'NGO'}
                        childComponent={<NGOForm/>}/>

                <InfoModal show={infoModalShow}
                    onHide={() => setInfoModalShow(false)}/>

              <Button variant="contained" onClick={() => setModalShow(true)}>Request Donation</Button>
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

             <NGORequestsModal show={nftModalShow}
                 onHide={() => setNFTModalShow(false)}
                 id={card.id} />

                    {console.log("CARD IS", card.id)}
                
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Donation Request Number: {cards.length-cards.indexOf(card)}
                    </Typography>
                    <Typography>
                      TxnId: <br/>{card.id}
                    </Typography>
                  </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" onClick={()=>setNFTModalShow(true)}>View</Button>
                    <Button size="small"onClick={()=>deleteCard(cards.indexOf(card))}>Mark Complete</Button>
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