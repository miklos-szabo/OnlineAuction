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
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";
import { useNavigate, useParams } from "react-router-dom";

const MyItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function AukcioSzerk(props) {
  const navigate = useNavigate();
  const [auction, setAuction] = useState({});
  const { id } = useParams();

  const [startvalue, onChangeStart] = useState(auction.startTime);
  const [endvalue, onChangeEnd] = useState(auction.endTime);

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "Auction/" + id + "/details", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAuction(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  const uploadImage = async (e) => {
    let file = e.target.files[0];
    let base64 = await convertBase64(file);
    setAuction({
      ...auction,
      picture: base64.substring(base64.lastIndexOf(",") + 1),
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API + "Auction/" + id + "/Edit", {
      method: "POST",
      headers: {
        //Authorization: localStorage.getItem("auth"),
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: +id,
        itemName: auction.itemName,
        picture: auction.picture,
        description: auction.description,
        startTime: startvalue,
        endTime: endvalue,
        startingPrice: +auction.startingPrice,
        priceStep: +auction.priceStep,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.status == 200) {
          navigate("/sajat");
        }
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
          <Grid container>
            <Grid container item md={12}>
              <Grid item md={1}></Grid>
              <Grid item md={11}>
                <h2>Aukció létrehozása</h2>
              </Grid>
            </Grid>
            <Grid container item md={1}></Grid>
            <Grid container item md={5}>
              <Grid item md={12}>
                <TextField
                  value={auction.itemName}
                  helperText={"Aukció tárgya"}
                  onChange={(e) =>
                    setAuction({ ...auction, itemName: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={10}>
                <TextField
                  multiline
                  fullWidth
                  rows={4}
                  required
                  value={auction.description}
                  helperText={"Részletes leírása"}
                  onChange={(e) =>
                    setAuction({ ...auction, description: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={10}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ border: "1px dashed grey" }}
                  height="150px"
                >
                  <Button variant="outlined" component="label">
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        uploadImage(e);
                      }}
                    />
                    <img
                      src={"data:image/jpeg;base64," + auction.picture}
                      width="200"
                      height="150"
                    />
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Grid container item md={6} spacing={1}>
              <Grid item md={12}>
                <TextField
                  helperText={"Kezdőlicit"}
                  value={auction.startingPrice}
                  required
                  onChange={(e) =>
                    setAuction({ ...auction, startingPrice: e.target.value })
                  }
                />
                <TextField
                  helperText={"Licitlépcső"}
                  value={auction.priceStep}
                  required
                  onChange={(e) =>
                    setAuction({ ...auction, priceStep: e.target.value })
                  }
                />
              </Grid>
              <Grid item md={12}></Grid>
              <Grid item md={4} className="datetext">
                Kezdődátum:
              </Grid>
              <Grid item md={6} className="datetext">
                Befejeződátum:
              </Grid>
              <Grid item md={4} className="date">
                <DateTimePicker
                  onChange={onChangeStart}
                  selected={auction.startTime}
                  value={startvalue}
                />
              </Grid>
              <Grid item md={6} className="date">
                <DateTimePicker onChange={onChangeEnd} value={endvalue} />
              </Grid>
              <Grid item md={12}>
                <div className="licit_btn">
                  <Button type="submit" variant="contained" color="primary">
                    Aukció szerkesztése
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
