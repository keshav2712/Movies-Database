import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tabBar: {
    backgroundColor: "black",
  },
  heading: {
    fontWeight: "bold",
    fontSize: "2.8rem",
    textAlign: "left",
    fontFamily: "Hallo Sans",
  },
}));

export default function Navbar({ setSearching, setMovies }) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [showCross, setShowCross] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("xs"));

  const handleClick = () => {
    if (showCross) {
      setSearching(false);
      setShowCross(false);
      setSearch("");
    } else if (search.length > 0) {
      setShowCross(true);
      setSearching(true);
      const search_route = "https://api.themoviedb.org/3/search/movie";
      const api_key = process.env.REACT_APP_API_KEY;
      axios
        .get(search_route, {
          params: {
            api_key: api_key,
            query: search,
          },
        })
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.tabBar}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={8}>
              <div className={classes.heading}>
                {!matches ? `Movies Database` : `MD`}
              </div>
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="outlined-textarea"
                placeholder="Search for your favorite movies"
                value={search}
                variant="outlined"
                size="small"
                style={{
                  backgroundColor: "white",
                  color: "white",
                  width: "100%",
                }}
                onChange={({ target }) => {
                  setSearch(target.value);
                  setShowCross(false);
                  if (target.value.length == 0) {
                    setSearching(false);
                  }
                }}
                onKeyPress={(ev) => {
                  if (ev.key === "Enter") {
                    handleClick();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment onClick={handleClick}>
                      <IconButton>
                        {!showCross ? <SearchIcon /> : <CloseIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
