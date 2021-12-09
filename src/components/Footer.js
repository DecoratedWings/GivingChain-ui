import React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { SocialIcon } from "react-social-icons";

export default function footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        <SocialIcon
          url="https://www.facebook.com/TheGivingChain/"
          network="facebook"
          style={{ height: 50, width: 50 }}
        />
        &nbsp;
        <SocialIcon
          url="https://www.instagram.com/thegivingchain/"
          network="instagram"
          style={{ height: 50, width: 50 }}
        />
        &nbsp;
        <SocialIcon
          url="https://t.me/BCPrinceton"
          network="telegram"
          style={{ height: 50, width: 50 }}
        />
        &nbsp;
        <SocialIcon
          url="https://twitter.com/bc_princeton"
          network="twitter"
          style={{ height: 50, width: 50 }}
        />
        &nbsp;
        <SocialIcon
          url="https://www.linkedin.com/groups/9055378/"
          network="linkedin"
          style={{ height: 50, width: 50 }}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="text.black"
        component="p"
      >
        Blockchain Powering Generosity
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://thegivingchain.org/index.html">
          The Giving Chain
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
