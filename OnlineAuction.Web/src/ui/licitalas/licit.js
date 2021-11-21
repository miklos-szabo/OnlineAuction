import React, { useState } from "react";
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

export default function Licitalas() {
  const classes = useStyles();

  return (
    <Box>
      <Menu />

      <Box className={classes.page} component="main">
        <Toolbar />
        <Grid container spacing={2} height="100%">
          <Grid item xs={6}>
            <MyItem>
              <div className="cim">Neve az adott termékneknek....</div>
            </MyItem>
            <MyItem>
              <img src={picture} alt="Tesztkép" width="400" height="300" />
            </MyItem>
            <MyItem>
              <div className="leiras">
                Hosszabb leírás, ahol részletezésre kerül az adott termék stb.
                stb..... New had happen unable uneasy. Drawings can followed
                improved out sociable not. Earnestly so do instantly pretended.
                See general few civilly amiable pleased account carried.
                Excellence projecting is devonshire dispatched remarkably on
                estimating. Side in so life past. Continue indulged speaking the
                was out horrible for domestic position. Seeing rather her you
                not esteem men settle genius excuse. Deal say over you age from.
                Comparison new ham melancholy son themselves.
              </div>
            </MyItem>
          </Grid>
          <Grid item xs={6}>
            <MyItem>
              <div className="licitek">
                <table id="customers">
                  <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                  </tr>
                  <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Berglunds snabbköp</td>
                    <td>Christina Berglund</td>
                    <td>Sweden</td>
                  </tr>
                  <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                  </tr>
                  <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                  </tr>
                  <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                  </tr>
                  <tr>
                    <td>Königlich Essen</td>
                    <td>Philip Cramer</td>
                    <td>Germany</td>
                  </tr>
                  <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                  </tr>
                  <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                  </tr>
                  <tr>
                    <td>North/South</td>
                    <td>Simon Crowther</td>
                    <td>UK</td>
                  </tr>
                  <tr>
                    <td>Paris spécialités</td>
                    <td>Marie Bertrand</td>
                    <td>France</td>
                  </tr>
                </table>
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
                    <Input>sa</Input>
                  </td>
                </tr>
              </table>
            </MyItem>
          </Grid>
          <Grid item xs={4}>
            <div className="akt_licit">Aktuális licitem: 100 Ft</div>
          </Grid>
          <Grid item xs={8}>
            <div className="licit_btn">
              <Button variant="contained" color="primary">
                Licitálás
              </Button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
