import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import DonorForm from "../Forms/DonorForm";
import AddDonation from "../Forms/AddDonation";
import InfoModal from "../Forms/InfoModal";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import TokenService from "../../FireflyServices/TokenService";
import Album from "../Album";

const baseUrl = "http://localhost:5000/api/v1";
const tokenService = new TokenService(baseUrl);

export default function Donor() {
  const [modalShow, setModalShow] = React.useState(false);
  const [donationModalVisible, setDonationModalVisible] = React.useState(false);
  const [nfts, setNfts] = useState([]);
  const [driverAddress, setDriverAddress] = useState();

  useEffect(() => {
    tokenService.getNfts().then(setNfts);
  }, []);

  useEffect(() => {
    tokenService
      .getAddress("http://localhost:5001/api/v1")
      .then(setDriverAddress);
  }, []);

  return (
    <Box>
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            NFT Collection
          </Typography>

          <Grid item xs />

          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="inherit"
          >
            <Badge badgeContent={4} color="error">
              <MailIcon />
            </Badge>
          </IconButton>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={5} color="error">
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
              On-Chain Donations
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Contributions made by donors are minted as NFTs on Firefly&apos;s
              private blockchain network. To initiate a transfer please select
              'transfer' in order to migrate the ownership to transport on
              pickup.
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
                org={"Donor"}
                childComponent={
                  <DonorForm
                    onSubmit={() => {
                      setModalShow(false);
                      tokenService.getNfts().then(setNfts);
                    }}
                  />
                }
              />

              <InfoModal
                show={donationModalVisible}
                onHide={() => setDonationModalVisible(false)}
              />

              <Button variant="contained" onClick={() => setModalShow(true)}>
                Add Donation
              </Button>
              <Button
                variant="outlined"
                onClick={() => setDonationModalVisible(true)}
              >
                Why NFT Donations?
              </Button>
            </Stack>
          </Container>
        </Box>
        <Album
          nfts={nfts}
          baseUrl={baseUrl}
          onTransfer={async (tokenIndex) => {
            await tokenService.transferToken(driverAddress, tokenIndex);
            setNfts(
              nfts.filter(function (nft) {
                return nft.tokenIndex !== tokenIndex;
              })
            );
          }}
        />
      </main>
    </Box>
  );
}
