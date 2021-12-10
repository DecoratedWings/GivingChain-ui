import React, { useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { CardActionArea } from "@mui/material";
import NFTModal from "./Forms/NFTModal";

export default function Album(props) {
  const [infoModalShow, setInfoModalShow] = React.useState(false);
  const [nftModalShow, setNFTModalShow] = React.useState(false);

  return (
    <Container sx={{ py: 8 }} maxWidth="xl">
      {/* End hero unit */}
      <Grid container spacing={4}>
        {props.nfts.map((nft) => (
          <Grid item key={nft.tokenIndex} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardActionArea>
                <NFTModal
                  show={nftModalShow}
                  onHide={() => setNFTModalShow(false)}
                  id={nft.tokenIndex}
                />

                <CardMedia
                  component="img"
                  sx={{
                    pt: "0%",
                  }}
                  image={`${props.baseUrl}/namespaces/default/data/${nft.dataId}/blob`}
                  alt="random"
                  display="flex"
                  justifyContent="center"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Donation number: {nft.tokenIndex}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" onClick={() => setNFTModalShow(true)}>
                  View
                </Button>
                {props.onTransfer ? (
                  <Button
                    size="small"
                    onClick={() => {
                      props.onTransfer(nft.tokenIndex);
                    }}
                  >
                    Transfer
                  </Button>
                ) : undefined}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
