import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "../menu";
import "./aukcio_table.css";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function Regiaukciok_list() {
  const [datas, setDatas] = useState([]);

  console.log(localStorage.getItem("auth"));

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "Auction/GetClosedAuctions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDatas(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  return (
    <Box>
      <Menu />
      <Box component="main">
        <Toolbar />
        <Grid container>
          <Grid item md={12}>
            <h2>Múltbéli aukciók</h2>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={10} alignItems="center" justifyContent="center">
            <div className="licitek">
              <table className="aukcio_list_table" id="customers">
                <thead>
                  <th>Termék</th>
                  <th>Nyerő licit</th>
                  <th>Licit lezárása</th>
                  <th>Eladó</th>
                  <th>Részletek</th>
                </thead>
                <tbody>
                  {datas.map((item) => (
                    <tr>
                      <td>{item.itemName}</td>
                      <td>{item.winnerPrice}</td>
                      <td>
                        {" "}
                        {new Date(item.endTime).toTimeString().substring(0, 8) +
                          "\t" +
                          new Date(item.endTime).toDateString()}
                      </td>
                      <td>{item.creator}</td>
                      <td>
                        <Button
                          variant="contained"
                          style={{ width: "20px" }}
                          href={"/licitalas/" + item.id}
                        >
                          <OpenInNewIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid>
          <Grid item md={1}></Grid>
        </Grid>
      </Box>
    </Box>
  );
}
