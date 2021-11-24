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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Sajat() {
  const [datasOngoing, setDatasOngoing] = useState([]);
  const [datasClosed, setDatasClosed] = useState([]);
  const [datasFuture, setDatasFuture] = useState([]);

  console.log(localStorage.getItem("auth"));

  const handleDelete = (id) => {
    console.log(id);
    fetch(process.env.REACT_APP_API + "Auction/" + id + "/Close", {
      method: "POST",
      headers: {
        //Authorization: localStorage.getItem("auth"),
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: +id,
    })
      .then((res) => {
        console.log(res.status);
      })

      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  };

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
        setDatasOngoing(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

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
        setDatasClosed(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    fetch(process.env.REACT_APP_API + "Auction/GetFutureAuctions", {
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
        setDatasFuture(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  console.log(localStorage.getItem("creator"));

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
              <th>Szerkesztés</th>
              <th>Törlés</th>
            </thead>
            <tbody>
              {datasOngoing.map(
                (item) =>
                  item.creator == localStorage.getItem("creator") && (
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
                        <Button
                          color="primary"
                          variant="contained"
                          href={"/aukcio/" + item.id}
                        >
                          <EditIcon />
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={(e) => {
                            handleDelete(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
        <div className="licitek">
          <table id="customers">
            <thead>
              <th>Termék</th>
              <th>Legmagasabb licit</th>
              <th>Licit lezárása</th>
              <th>Eladó</th>
            </thead>
            <tbody>
              {datasClosed.map(
                (item) =>
                  item.creator == localStorage.getItem("creator") && (
                    <tr>
                      <td>{item.itemName}</td>
                      <td>{item.highestBid}</td>
                      <td>
                        {new Date(item.endTime).toTimeString().substring(0, 8) +
                          "\t" +
                          new Date(item.endTime).toDateString()}
                      </td>
                      <td>{item.creator}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>{" "}
        <div className="licitek">
          <table id="customers">
            <thead>
              <th>Termék</th>
              <th>Legmagasabb licit</th>
              <th>Licit lezárása</th>
              <th>Eladó</th>
              <th>Szerkesztés</th>
              <th>Törlés</th>
            </thead>
            <tbody>
              {datasFuture.map(
                (item) =>
                  item.creator == localStorage.getItem("creator") && (
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
                        <Button
                          color="primary"
                          variant="contained"
                          href={"/aukcio/" + item.id}
                        >
                          <EditIcon />
                        </Button>
                      </td>
                      <td>
                        <Button
                          color="error"
                          variant="contained"
                          onClick={(e) => {
                            handleDelete(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
}
