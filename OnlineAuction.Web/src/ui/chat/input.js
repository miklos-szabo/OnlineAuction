import React, { useState } from "react";

export default function ChatInput(props) {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const isUserProvided = user && user !== "";
    const isMessageProvided = message && message !== "";

    if (isUserProvided && isMessageProvided) {
      props.sendMessage(user, message);
    } else {
      alert("Hiányos üzenetkérés");
    }
  };

  const handleUserUpdate = (e) => {
    setUser(e.target.value);
  };

  const handleMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="user">Felhasználó:</label>
      <br />
      <input id="user" name="user" value={user} onChange={handleUserUpdate} />
      <br />
      <label htmlFor="message">Üzenet:</label>
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
      <button>Üzenet küldése</button>
    </form>
  );
}
