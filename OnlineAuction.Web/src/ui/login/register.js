import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "../login_menu";
import { useNavigate } from "react-router-dom";

const saltedSha256 = require("salted-sha256");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(2),

    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "300px",
    },
    "& .MuiButtonBase-root": {
      margin: theme.spacing(2),
    },
  },
}));

export default function Register() {
  const classes = useStyles();
  let navigate = useNavigate();

  const [fullname, setfullname] = useState("");
  const [Email, setEmail] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState({
    done: false,
    data: "",
  });
  let mysalt;

  useEffect(() => {
    if (res.data.includes("Username already taken")) {
      alert("A felhasználó már létezik");
    } else if (res.done == true) {
      navigate("/");
    }
  }, [res]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let passwordhash = generateHash(password);
    console.log(fullname, Email, username, password, mysalt, passwordhash);
    fetch(process.env.REACT_APP_API + "Account/Register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        passwordHash: passwordhash,
        salt: mysalt,
        fullName: fullname,
        email: Email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setRes({
          done: true,
          data: res,
        });
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  };

  const generateHash = (password) => {
    const saltedHash = saltedSha256(password, getRandomSalt());
    return saltedHash;
  };

  const getRandomSalt = () => {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < 16; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }
    mysalt = result;
    return result;
  };

  return (
    <Box>
      <Menu />
      <Box component="main">
        <Toolbar />
        <form className={classes.root} onSubmit={handleSubmit}>
          <TextField
            label="fullname"
            variant="filled"
            required
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
          />
          <TextField
            label="Email"
            variant="filled"
            type="Email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="username"
            variant="filled"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="filled"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}
