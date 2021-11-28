import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@material-ui/styles";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import Chat from "../chat/chat";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./licit.css";

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
    page: {
      height: "100%",
    },
  };
});

export default function Licitalas(props) {
  const classes = useStyles();
  const [datas, setDatas] = useState({});
  const [bidList, setBidList] = useState();
  const [messageList, setMessageList] = useState([]);
  const { id } = useParams();

  let picture_url = "data:image/jpeg;base64," + datas.picture;
  let price;

  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  let connection;

  latestChat.current = chat;

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
        setBidList(data.lastBids.slice(0, 10));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });

    fetch(process.env.REACT_APP_API + "Auction/" + id + "/GetMessages", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChat(data.slice(-7));
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);

  console.log(chat);

  useEffect(() => {
    connection = new HubConnectionBuilder()
      .withUrl("http://localhost:53303/hubs/auctionHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        connection.send("JoinAuction", id);
        console.log("Connected!");
      })
      .then(() => {
        connection.on("ReceiveChatMessage", (message) => {
          const updatedChat = [...latestChat.current];
          updatedChat.push(message);
          setChat(message);
        });
      })
      .then(() => {
        connection.on("ReceiveBid", (bid) => {
          setBidList(bid);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
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

  return (
    <Box>
      <Menu />

      <Box className={classes.page} component="main">
        <Toolbar />
        <Grid container>
          <Grid container item md={10} spacing={2} height="100%">
            <Grid item xs={5}>
              <MyItem>
                <div className="cim">{datas.itemName}</div>
              </MyItem>
              <MyItem>
                <img src={picture_url} width="200" height="150" />
              </MyItem>
              <MyItem>
                <div className="leiras">{datas.description}</div>
                <div className="licit_kezdes">
                  Licit kezdés:{" "}
                  {new Date(datas.startTime).toTimeString().substring(0, 8) +
                    "\t" +
                    new Date(datas.startTime).toDateString()}
                </div>
                <div className="licit_vege">
                  Licit vége:{" "}
                  {new Date(datas.endTime).toTimeString().substring(0, 8) +
                    "\t" +
                    new Date(datas.endTime).toDateString()}
                </div>
              </MyItem>
              <MyItem className="table_btn_licit">
                <table className="licit_table">
                  {datas.highestBid == null && (
                    <tr>
                      <td>Kezdő licit: </td>
                      <td>{datas.startingPrice} Ft</td>
                    </tr>
                  )}
                  {datas.highestBid != null && (
                    <tr>
                      <td>Aktuális licit: </td>
                      <td>{datas.highestBid} Ft</td>
                    </tr>
                  )}

                  <tr>
                    <td>Licitlépcső:</td>
                    <td>{datas.priceStep} Ft</td>
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
                <div className="licit_btn">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleClick}
                  >
                    Licitálás
                  </Button>
                </div>
              </MyItem>
            </Grid>
            <Grid item xs={7}>
              <MyItem>
                <div className="licitek">
                  {" "}
                  {bidList == undefined && <div>Még nincs licit</div>}
                  {bidList != undefined && (
                    <table className="licit_table" id="customers">
                      <thead>
                        <th>Licitáló</th>
                        <th>Licit értéke</th>
                        <th>Időpont</th>
                      </thead>
                      <tbody>
                        {bidList.map((item) => (
                          <tr>
                            <td>{item.bidderUserName}</td>
                            <td>{item.price} Ft</td>
                            <td className="t_date">
                              <div>
                                {new Date(item.bidTime)
                                  .toTimeString()
                                  .substring(0, 8)}
                              </div>
                              <div>{new Date(item.bidTime).toDateString()}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </MyItem>
            </Grid>
          </Grid>
          <Grid container item md={2} spacing={2} height="100%">
            <div style={{ margin: "10px" }}>
              <div style={{ height: "20px" }}>{""}</div>
              <Chat auction_id={id} chat={chat.slice(0, 7)} />
            </div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
