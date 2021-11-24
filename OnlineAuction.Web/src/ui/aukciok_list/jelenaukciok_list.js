import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Menu from "../menu";
import "./aukciok_list.css";
import GavelIcon from "@mui/icons-material/Gavel";

export default function Jelenaukciok_list() {
  const [datas, setDatas] = useState([]);

  console.log(localStorage.getItem("auth"));

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "Auction/GetOngoingAuctions", {
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
        <div className="licitek">
          <table id="customers">
            <thead>
              <th>Termék</th>
              <th>Legmagasabb licit</th>
              <th>Licit lezárása</th>
              <th>Eladó</th>
              <th>Licitálok</th>
            </thead>
            <tbody>
              {datas.map((item) => (
                <tr>
                  <td>{item.itemName}</td>
                  <td>{item.highestBid}</td>
                  <td>
                    {new Date(item.endTime).toTimeString().substring(0, 8) +
                      "\t" +
                      new Date(item.endTime).toDateString()}
                  </td>
                  <td>{item.creator}</td>
                  <td>
                    <Button variant="contained" href={"/licitalas/" + item.id}>
                      <GavelIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
}
