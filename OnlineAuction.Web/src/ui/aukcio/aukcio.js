import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import "./aukcio.css";
import Menu from "../menu";
import Icon from "@mui/material/Icon";
import ImageIcon from "@mui/icons-material/Image";
import DateTimePicker from "react-datetime-picker";
import { Buffer } from "buffer";

const MyItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Aukcio(props) {
  const [startvalue, onChangeStart] = useState(new Date());
  const [endvalue, onChangeEnd] = useState(new Date());
  const [auction, setAuction] = useState({
    itemName: "",
    picture: "",
    description: "",
    startTime: "",
    endTime: "",
    startingPrice: 0,
    priceStep: 0,
  });
  const [baseImage, setBaseImage] = useState("");

  useEffect(() => {
    setAuction({ ...auction, startTime: startvalue });
  }, [startvalue]);

  useEffect(() => {
    setAuction({ ...auction, endTime: endvalue });
  }, [endvalue]);

  console.log(baseImage);

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setAuction({ ...auction, picture: Buffer.from(base64, "base64") });
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  console.log(props.auth.token);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API + "Auction/CreateAuction", {
      method: "POST",
      headers: {
        Authorization: props.auth.token,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auction),
    })
      .then((res) => {
        console.log(res);
        console.log(auction.startTime);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  };

  return (
    <Box>
      <Menu />
      <Box component="main">
        <Toolbar />
        <form onSubmit={handleSubmit}>
          <Grid container md={12} spacing={1}>
            <Grid item md={12}>
              <h2>Aukció létrehozása</h2>
            </Grid>
            <Grid item md={7}>
              <TextField
                required
                label={"Aukció tárgya"}
                onChange={(e) =>
                  setAuction({ ...auction, itemName: e.target.value })
                }
              />
            </Grid>

            <Grid item md={6}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ border: "1px dashed grey" }}
                height="100px"
              >
                {baseImage == "" && (
                  <Button variant="contained" component="label">
                    <Icon>
                      <ImageIcon />
                    </Icon>
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                  </Button>
                )}
                {baseImage != "" && <img src={baseImage} height="200px" />}
              </Box>
            </Grid>

            <Grid item md={1}>
              {" "}
            </Grid>
            <Grid item md={2}>
              Kezdődátum:
              <DateTimePicker onChange={onChangeStart} value={startvalue} />
              Befejeződátum:
              <DateTimePicker onChange={onChangeEnd} value={endvalue} />
            </Grid>

            <Grid item md={6}>
              <TextField
                multiline
                fullWidth
                rows={4}
                required
                label={"Részletes leírása"}
                onChange={(e) =>
                  setAuction({ ...auction, description: e.target.value })
                }
              />
            </Grid>
            <Grid item md={1}></Grid>

            <Grid item md={2}>
              <TextField
                label={"Kezdőlicit"}
                required
                onChange={(e) =>
                  setAuction({ ...auction, startingPrice: e.target.value })
                }
              />
              <TextField
                label={"Licitlépcső"}
                required
                onChange={(e) =>
                  setAuction({ ...auction, priceStep: e.target.value })
                }
              />
            </Grid>
            <Grid item md={9}></Grid>
            <Grid item md={3}>
              <div className="licit_btn">
                <Button type="submit" variant="contained" color="primary">
                  Aukció létrehozása
                </Button>
              </div>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
