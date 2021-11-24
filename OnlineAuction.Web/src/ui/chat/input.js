import React, { useState } from "react";
import "./chat.css";

export default function ChatInput(props) {
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const isMessageProvided = message && message !== "";

    if (isMessageProvided) {
      props.sendMessage(message);
    } else {
      alert("Hiányos üzenetkérés");
    }
  };

  const handleMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label className="uzenet_text" htmlFor="message">
        Üzenet:
      </label>
      <br />
      <input
        type="text"
        id="message"
        name="message"
        value={message}
        onChange={handleMessageUpdate}
      />
      <br />
      <br />
      <button type="submit" className="uzenet_btn">
        Üzenet küldése
      </button>
    </form>
  );
}
