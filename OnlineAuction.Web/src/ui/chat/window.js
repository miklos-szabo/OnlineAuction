import React from "react";

import Message from "./message";

const ChatWindow = (props) => {
  const chat = props.chat.map((item) => (
    <Message
      key={Date.now() * Math.random()}
      user={item.senderFullName}
      message={item.message}
    />
  ));

  return <div>{chat}</div>;
};

export default ChatWindow;
