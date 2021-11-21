import React, { useEffect, useState } from "react";
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

export default function Login(props) {
  let navigate = useNavigate();

  const classes = useStyles();

  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [stauts, setStatus] = useState();
  const [auth, setAuth] = useState({
    signin: false,
    username: "",
    token: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchSalt();
  };

  useEffect(() => {
    if (
      auth.token.includes("was not found") ||
      auth.token.includes("wrong username or password")
    ) {
      alert("Hibás felhasználónév vagy jelszó!");
    } else if (auth.signin == true) {
      navigate("/aukcio");
    }
  }, [auth]);

  const fetchLogin = (hash) => {
    console.log(hash);

    fetch(process.env.REACT_APP_API + "Account/Login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: username,
        passwordHash: hash,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAuth({
          signin: true,
          username: username,
          token: res,
        });
        props.cbAuth({
          signin: true,
          username: username,
          token: res,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchSalt = () => {
    fetch(
      process.env.REACT_APP_API + "Account/GetSaltForUser?userName=" + username,
      {
        method: "GET",
        headers: {
          Accept: "text/plain",
          "Content-Type": "text/plain",
        },
      }
    )
      .then(function (response) {
        return response.text().then(function (text) {
          fetchLogin(saltedSha256(password, text));
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };

  return (
    <Box>
      <Menu />
      <Box component="main">
        <Toolbar />
        <form className={classes.root} onSubmit={handleSubmit}>
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
              Login
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}
