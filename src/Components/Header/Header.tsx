import { Add, Favorite } from "@mui/icons-material";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const goToCreateNewWatchlist = () => {
    navigate("/create-watchlist");
  };

  const goToHomePage = () => {
    navigate("/");
  };

  const goToWatchList = () => {
    navigate("/watchlist");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={goToHomePage}
          >
            Cryptocurrency Watchlist
          </Typography>
          <Button color="inherit" onClick={goToWatchList}>
            <Favorite />
            <span style={{ marginLeft: "10px" }}>Watch List</span>
          </Button>
          <Button color="inherit" onClick={goToCreateNewWatchlist}>
            <Add />
            <span style={{ marginLeft: "10px" }}>Create New</span>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Header };
