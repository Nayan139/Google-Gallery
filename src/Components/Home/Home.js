/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { storage } from "../../auth/config";
import {
  listAll,
  ref,
  uploadBytes,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import "./Home.css";
import usePagination from "../../helpers/pagination";

const Home = () => {
  const [error, setError] = useState({ flag: false, msg: "" });
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const PER_PAGE = 9;
  const count = Math.ceil(data.length / PER_PAGE);
  const Files = ["image/jpg", "image/jpeg", "image/png"];

  useEffect(() => {
    getImageList();
  }, [error]);

  const getImageList = async () => {
    try {
      const listRef = ref(storage, "/images");
      const imageList = await listAll(listRef);
      const urls = await Promise.all(
        imageList.items.map(async (ref) => {
          const data = {
            url: await getDownloadURL(ref),
            metaData: await getMetadata(ref),
          };
          return data;
        })
      );
      await setData(urls);
    } catch (error) {
      console.log("error is:-", error);
    }
  };

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

  const _DATA = usePagination(data, PER_PAGE);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
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
            placeSelf: "center",
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
          <p className="box_message">{error.flag ? error.msg : error.msg}</p>
        </Typography>

        <Grid container spacing={{ xs: 8 }} columns={{ xs: 1, sm: 8, md: 12 }}>
          {data.length > 0
            ? _DATA.currentData().map((items, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      height: {
                        xs: "250px",
                        sm: "300px",
                      },
                      width: {
                        xs: "250px",
                        sm: "300px",
                      },
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={`${items.url}.png`}
                        alt={`${items.metaData.name}`}
                      />
                    </CardActionArea>
                  </Card>
                </Grid>
              ))
            : ""}
        </Grid>
        {data.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "4rem",
            }}
          >
            <Pagination
              count={count}
              size="large"
              page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChange}
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default Home;
