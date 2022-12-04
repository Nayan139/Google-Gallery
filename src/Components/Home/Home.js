import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { storage } from "../../auth/config";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./Home.css";

const Home = () => {
  const [error, setError] = useState({ flag: false, msg: "" });
  const [data, setData] = useState([]);

  const Files = ["image/jpg", "image/jpeg", "image/png"];

  useEffect(() => {
    const listRef = ref(storage, "/images");
    listAll(listRef).then((res) => {
      res.items.forEach((item) =>
        getDownloadURL(item).then((url) => {
          setData([{ downloadURL: url }]);
        })
      );
    });
  }, [error]);

  const handleFileUpload = async (e) => {
    try {
      const file = e.target.files;
      if (file.length > 0 && !Files.includes(file[0].type)) {
        setError({
          msg: " Please upload files in .jpeg .jpg .png format",
          flag: true,
        });
      } else {
        setError({ msg: "", flag: false });

        const metadata = {
          contentType: "image/jpeg",
        };
        const storageRef = ref(storage, `/images/${file[0].name}`, metadata);

        uploadBytes(storageRef, file[0], metadata).then((snapshot) => {
          setError({ msg: "File Uploaded Successfully", flag: false });
          handleSetRest();
        });
      }
    } catch (error) {}
  };

  const handleSetRest = () => {
    setTimeout(() => {
      setError({ msg: "", error: false });
    }, 2000);
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
        <Typography
          sx={{
            fontFamily: "PlayfairDisplay",
            fontSize: "1rem",
            color: error.flag ? "#de6b6b" : "rgb(51, 179, 199)",
            placeSelf: "center",
          }}
        >
          {error.flag ? error.msg : error.msg}
        </Typography>
        {data.length > 0
          ? data.map((items) => (
              <img src={`${items.downloadURL}.png`} alt="name" />
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default Home;
