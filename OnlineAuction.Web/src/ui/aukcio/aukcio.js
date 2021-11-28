import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const MyItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Aukcio(props) {
  const navigate = useNavigate();
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

  const input = document.querySelector("input");
  const reader = new FileReader();
  const fileByteArray = [];

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setAuction({
      ...auction,
      picture: base64.substring(base64.lastIndexOf(",") + 1),
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_API + "Auction/CreateAuction", {
      method: "POST",
      headers: {
        //Authorization: localStorage.getItem("auth"),
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
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
                  required
                  label={"Aukció tárgya"}
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
                  label={"Részletes leírása"}
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
                  {auction.picture == "" && (
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
                  {auction.picture != "" && (
                    <img
                      src={"data:image/jpeg;base64," + auction.picture}
                      width="200"
                      height="150"
                    />
                  )}
                </Box>
              </Grid>
            </Grid>

            <Grid container item md={6} spacing={1}>
              <Grid item md={12}>
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
              <Grid item md={12}></Grid>
              <Grid item md={4} className="datetext">
                Kezdődátum:
              </Grid>
              <Grid item md={6} className="datetext">
                Befejeződátum:
              </Grid>
              <Grid item md={4} className="date">
                <DateTimePicker onChange={onChangeStart} value={startvalue} />
              </Grid>
              <Grid item md={6} className="date">
                <DateTimePicker onChange={onChangeEnd} value={endvalue} />
              </Grid>
              <Grid item md={12}>
                <div className="licit_btn">
                  <Button type="submit" variant="contained" color="primary">
                    Aukció létrehozása
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
