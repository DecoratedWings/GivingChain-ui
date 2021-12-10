import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddDonation from "../Forms/AddDonation";
import InfoModal from "../Forms/InfoModal";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import BusinessIcon from "@mui/icons-material/Business";
import NGOForm from "../Forms/NGOForm.js";
import TokenService from "../../FireflyServices/TokenService";
import Album from "../Album";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FDDA0D",
    },
  },
});

const baseUrl = "http://localhost:5002/api/v1";
const tokenService = new TokenService(baseUrl);

export default function NGO() {
  const [modalShow, setModalShow] = React.useState(false);
  const [requestModalVisible, setRequestModalVisible] = React.useState(false);
  const [nfts, setNfts] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState();

  useEffect(() => {
    tokenService.getNfts().then(setNfts);
  }, []);

  useEffect(() => {
    tokenService
      .getAddress("http://localhost:5003/api/v1")
      .then(setRecipientAddress);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BusinessIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            NGO Request Donation
          </Typography>

          <Grid item xs />

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={2} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton size="large" color="inherit">
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
              Organization Donation Requests
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Please Fill out the form in order to request a specific
              contribution from donors. Requests are broadcasted to the network.
              Private details are shared between entities as necessary upon the
              confirmation of the donation.
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
                org={"NGO"}
                childComponent={<NGOForm />}
              />

              <InfoModal
                show={requestModalVisible}
                onHide={() => setRequestModalVisible(false)}
              />

              <Button variant="contained" onClick={() => setModalShow(true)}>
                Request Donation
              </Button>
            </Stack>
          </Container>
        </Box>
        <Album
          nfts={nfts}
          baseUrl={baseUrl}
          onTransfer={async (tokenIndex) => {
            await tokenService.transferToken(recipientAddress, tokenIndex);
            setNfts(
              nfts.filter(function (nft) {
                return nft.tokenIndex !== tokenIndex;
              })
            );
          }}
        />
      </main>
    </ThemeProvider>
  );
}
