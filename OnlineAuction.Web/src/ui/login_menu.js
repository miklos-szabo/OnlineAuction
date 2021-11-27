import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Grid } from "@material-ui/core";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./menu.css";

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
              <Grid item md={2}>
                <Button
                  disabled
                  className="btn"
                  variant="contained"
                  color="menu_button"
                >
                  Új aukció
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  disabled
                  className="btn"
                  variant="contained"
                  color="menu_button"
                >
                  Régebbi aukciók
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  disabled
                  className="btn"
                  variant="contained"
                  color="menu_button"
                >
                  Jelenlegi aukciók
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  disabled
                  className="btn"
                  variant="contained"
                  color="menu_button"
                >
                  Jövőbeni aukciók
                </Button>
              </Grid>

              <Grid item md={2}>
                <Button
                  disabled
                  className="btn"
                  variant="contained"
                  color="menu_button"
                >
                  Saját
                </Button>
              </Grid>
              <Grid item md={2}>
                <Button disabled className="log" color="inherit">
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
