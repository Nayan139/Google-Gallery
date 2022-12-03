import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { BsFillPatchPlusFill } from "react-icons/bs";
import "./Home.css";

const Home = () => {
  const [error, setError] = useState(false);
  const Files = ["image/jpg", "image/jpeg", "image/png"];
  const handleFileUpload = (e) => {
    const file = e.target.files;
    if (file.length > 0 && !Files.includes(file[0].type)) {
      setError(true);
    } else {
      setError(false);
    }
  };
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
            fontFamily: "PlayfairDisplay",
            fontSize: { xs: "0.8rem", md: "1.5rem", sm: "1.2rem" },
            color: "rgb(51, 179, 199)",
          }}
        >
          Upload your memories on Google Gallery
        </Typography>
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e)}
        />
        <label htmlFor="icon-button-file" style={{ placeSelf: "center" }}>
          <BsFillPatchPlusFill className="upload_icon" />
        </label>
        {error ? (
          <Typography
            sx={{
              fontFamily: "PlayfairDisplay",
              fontSize: "1rem",
              color: "#de6b6b",
              placeSelf: "center",
            }}
          >
            Please upload files in .jpeg .jpg .png format
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default Home;
