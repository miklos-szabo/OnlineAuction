import React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Menu from "./login_menu";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
    menu_button: {
      main: "#626060",
      darker: "#053e85",
    },
  },
});

export default function Main() {
  return (
    <Box>
      <Menu />
      <Toolbar />
      <Toolbar />

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={3}>
          <Button
            href="/login"
            sx={{ width: 200, height: 100 }}
            variant="contained"
          >
            LogIn
          </Button>{" "}
          <Button
            href="/register"
            sx={{ width: 200, height: 100 }}
            variant="contained"
          >
            {" "}
            Register
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
