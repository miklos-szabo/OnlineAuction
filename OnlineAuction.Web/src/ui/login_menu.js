import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ mr: 3 }}>
              News
            </Typography>
            <Button
              disabled
              variant="contained"
              color="menu_button"
              sx={{ mr: 3, width: 300 }}
            >
              Aukcio
            </Button>
            <Button
              disabled
              variant="contained"
              color="menu_button"
              sx={{ mr: 3, width: 300 }}
            >
              Licitalas
            </Button>
            <Button
              disabled
              variant="contained"
              color="menu_button"
              sx={{ mr: 75, width: 500 }}
            >
              Aukciók listája
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
