import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@material-ui/styles";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import picture from "../../teszt.jpg";
import "./licit.css";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";

import Menu from "../menu";

const MyItem = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    /*root: {
      display: "flex",
      background: "linear-gradient(135deg, #eeeeee 30%, #bdbdbd 90%)",
      //height: "100%",
    },*/
    page: {
      height: "100%",
    },
  };
});

export default function Licitalas(props) {
  const classes = useStyles();
  const [datas, setDatas] = useState({});

  let picture_url = "data:image/jpeg;base64," + datas.picture;

  console.log(picture_url);

  let price;
  console.log(price);

  const { id } = useParams();

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
        setDatas(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  const handleClick = () => {
    fetch(process.env.REACT_APP_API + "Auction/" + id + "/Bid", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auctionId: +id,
        price: +price,
      }),
    })
      .then((response) =>
        response
          .json()
          .then((data) => ({
            data: data,
            status: response.status,
          }))
          .then((res) => {
            console.log(res.status, res.data);
            if (res.status) {
              alert(res.data);
            }
          })
      )
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  };

  console.log(datas.lastBids == undefined);

  return (
    <Box>
      <Menu />

      <Box className={classes.page} component="main">
        <Toolbar />
        <Grid container spacing={2} height="100%">
          <Grid item xs={5}>
            <MyItem>
              <div className="cim">{datas.itemName}</div>
            </MyItem>
            <MyItem>
              <img src={picture_url} width="200" height="150" />
            </MyItem>
            <MyItem>
              <div className="leiras">{datas.description}</div>
            </MyItem>
          </Grid>
          <Grid item xs={7}>
            <MyItem>
              <div className="licitek">
                {" "}
                {datas.lastBids == undefined && <div>Még nincs licit</div>}
                {datas.lastBids != undefined && (
                  <table id="customers">
                    <thead>
                      <th>Licitáló</th>
                      <th>Licit értéke</th>
                      <th>Időpont</th>
                    </thead>
                    <tbody>
                      {datas.lastBids.map((item) => (
                        <tr>
                          <td>{item.bidderUserName}</td>
                          <td>{item.price}</td>
                          <td>{item.bidTime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </MyItem>
            <MyItem>
              <table>
                <tr>
                  <td>Aktuális licit: </td>
                  <td>200 Ft</td>
                </tr>
                <tr>
                  <td>Licitlépcső:</td>
                  <td>50 Ft</td>
                </tr>
                <tr>
                  <td>Új licit:</td>
                  <td className="sajat_licit">
                    <Input
                      onChange={(e) => {
                        price = e.target.value;
                      }}
                    ></Input>
                  </td>
                </tr>
              </table>
            </MyItem>
          </Grid>
          <Grid item xs={4}>
            <div className="akt_licit">Aktuális licitem: {price} </div>
          </Grid>
          <Grid item xs={8}>
            <div className="licit_btn">
              <Button variant="contained" color="primary" onClick={handleClick}>
                Licitálás
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
