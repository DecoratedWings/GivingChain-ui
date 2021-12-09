import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import TokenService from "../../FireflyServices/TokenService";
import Album from "../Album";

const theme = createTheme();

const baseUrl = "http://localhost:5001/api/v1";
const tokenService = new TokenService(baseUrl);

export default function Driver() {
  const [nfts, setNfts] = useState([]);
  const [ngoAddress, setNgoAddress] = useState();

  useEffect(() => {
    tokenService.getNfts().then(setNfts);
  }, []);

  useEffect(() => {
    tokenService.getAddress("http://localhost:5002/api/v1").then(setNgoAddress);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LocalShippingIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Donations Eligible for pickup
          </Typography>

          <Grid item xs />

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={8} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={12} color="error">
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
              Transport Updates
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Transport may select the donation they wish to pickup and view
              specific address details. Status updates are broadcast to the
              entire network.
            </Typography>
          </Container>
        </Box>
        <Album
          nfts={nfts}
          baseUrl={baseUrl}
          onTransfer={async (tokenIndex) => {
            await tokenService.transferToken(ngoAddress, tokenIndex);
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
