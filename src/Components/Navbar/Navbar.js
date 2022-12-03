import React from "react";
import { Box, Typography } from "@mui/material";
import { TfiGallery } from "react-icons/tfi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <Box className="Box_main">
      <Box className="Box_header">
        <TfiGallery />
        <Typography
          sx={{
            fontFamily: "PlayfairDisplay-Bold",
            color: "rgb(51, 179, 199)",
            fontSize: { xs: "0.8rem", sm: "1.5rem" },
          }}
        >
          Google Gallery
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;
