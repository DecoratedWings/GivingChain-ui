import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CardActionArea } from "@mui/material";
import { SocialIcon } from "react-social-icons";
import RecipientForm from "../Forms/RecipientForm";
import AddDonation from "../Forms/AddDonation";
import FeedbackModal from "../Forms/FeedbackModal";
import RecipientModal from "../Forms/RecipientModal";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import TokenService from "../../FireflyServices/TokenService";
import Album from "../Album";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff3333",
    },
  },
});

const baseUrl = "http://localhost:5003/api/v1";
const tokenService = new TokenService(baseUrl);

export default function Recipient() {
  const [modalShow, setModalShow] = React.useState(false);
  const [infoModalShow, setInfoModalShow] = React.useState(false);
  const [nftModalShow, setNFTModalShow] = React.useState(false);
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    tokenService.getNfts().then(setNfts);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <EmojiPeopleIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Recipient Held NFTs and Received Donations
          </Typography>

          <Grid item xs />

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={9} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton size="large" color="inherit">
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
            bgcolor: "background.paper",
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
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            ></Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <AddDonation
                show={modalShow}
                onHide={() => setModalShow(false)}
                org={"Recipient"}
                childComponent={<RecipientForm />}
              />

              <FeedbackModal
                show={infoModalShow}
                onHide={() => setInfoModalShow(false)}
              />

              <Button variant="contained" onClick={() => setModalShow(true)}>
                Send Message
              </Button>
              <Button variant="outlined" onClick={() => setInfoModalShow(true)}>
                Rate Delivery
              </Button>
            </Stack>
          </Container>
        </Box>
        <Album nfts={nfts} baseUrl={baseUrl} />
      </main>
    </ThemeProvider>
  );
}
