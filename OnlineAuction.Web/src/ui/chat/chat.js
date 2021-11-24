import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "./window";
import ChatInput from "./input";

const Chat = (props) => {
  const [chat, setChat] = useState([]);
  const latestChat = useRef(null);

  latestChat.current = chat;

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:53303/hubs/auctionHub")
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then((result) => {
        connection.on("JoinAuction", props.auction_id);
        console.log("Connected!");
        console.log(props.auction_id);
      })
      .then(() => {
        connection.on("ReceiveChatMessage", (message) => {
          const updatedChat = [...latestChat.current];
          updatedChat.push(message);

          setChat(updatedChat);
          console.log(chat);
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  }, []);

  const getMessage = () => {
    fetch(
      process.env.REACT_APP_API + "Auction/" + props.auction_id + "/GetMessage",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  const sendMessage = async (message) => {
    try {
      await fetch(
        process.env.REACT_APP_API +
          "Auction/" +
          props.auction_id +
          "/SendMessage",
        {
          method: "POST",
          body: message,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log("Sending message failed.", e);
    }
  };

  return (
    <div>
      <ChatInput sendMessage={sendMessage} />
      <hr />
      <ChatWindow chat={chat} />
    </div>
  );
};

export default Chat;
