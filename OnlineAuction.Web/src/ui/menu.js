import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid } from "@material-ui/core";

import { Navigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    menu_button: {
      main: "#626060",
      darker: "#053e85",
    },
  },
});

export default function Menu(props) {
  return (
    <Box>
      <ThemeProvider theme={theme}>
        <AppBar
          position="fixed"
          sx={{
            bgcolor: "#424242",
          }}
        >
          <Toolbar>
            <Grid container md={12} spacing={1}>
              <Grid item md={1}>
                <Typography variant="h6" component="div" sx={{ mr: 3 }}>
                  News
                </Typography>
              </Grid>

              <Grid item md={1}>
                <Button variant="contained" color="menu_button" href="/aukcio">
                  Aukcio
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  variant="contained"
                  color="menu_button"
                  href="/aukciok_list"
                >
                  Régebbi aukciók
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  variant="contained"
                  color="menu_button"
                  href="/aukciok_list"
                >
                  Jelenlegi aukciók
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  variant="contained"
                  color="menu_button"
                  href="/aukciok_list"
                >
                  Jövőbeni aukciók
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button href="/" color="inherit">
                  LogOut
                </Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
