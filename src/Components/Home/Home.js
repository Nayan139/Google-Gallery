import React from "react";
import { Box, Typography } from "@mui/material";
import { BsFillPatchPlusFill } from "react-icons/bs";
import "./Home.css";

const Home = () => {
  return (
    <Box className="Box_home">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography
          sx={{
            fontFamily: "PlayfairDisplay-Bold",
            fontSize: { xs: "1.8rem", md: "2.8rem", sm: "2rem" },
            textAlign: "center",
            color: "rgb(51, 179, 199)",
          }}
        >
          Your Own Gallery
        </Typography>
        <Typography
          sx={{
            fontFamily: "PlayfairDisplay-Bold",
            fontSize: { xs: "0.8rem", md: "1.5rem", sm: "1.2rem" },
            color: "rgb(51, 179, 199)",
          }}
        >
          Upload your memories on Google Gallery
        </Typography>
        <BsFillPatchPlusFill className="upload_icon" />
      </Box>
    </Box>
  );
};

export default Home;
