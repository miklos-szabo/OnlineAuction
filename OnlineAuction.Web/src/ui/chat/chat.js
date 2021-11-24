import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

import ChatWindow from "./window";
import ChatInput from "./input";

const Chat = (props) => {
  const sendMessage = async (message) => {
    try {
      await fetch(
        process.env.REACT_APP_API +
          "Auction/" +
          props.auction_id +
          "/SendMessage?message=" +
          message,
        {
          method: "POST",
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
      <ChatWindow chat={props.chat} />
    </div>
  );
};

export default Chat;
