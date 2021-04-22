import { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
  title: {
    color: "white",
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0) 100%)",
  },
  genreName: {
    color: "white",
    paddingLeft: "1.5rem",
    paddingTop: "1rem",
    fontFamily: "Hallo Sans",
  },
}));

const Genre = ({ genre }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const get_movies_route = "https://api.themoviedb.org/3/discover/movie";
    axios
      .get(get_movies_route, {
        params: {
          api_key: api_key,
          with_genres: genre.id,
        },
      })
      .then((response) => {
        setMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className={classes.genreName}>{genre.name}</h1>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={5}>
          {movies.map((movie) => (
            <GridListTile
              key={movie.id}
              onClick={() => {
                history.push(`/movie/${movie.id}`);
              }}
            >
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
                    : `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNJNjVzTHosIGRAPtFpKyH7fdRV76aEgwb9A&usqp=CAU`
                }
                alt={movie.title}
              />
              <GridListTileBar
                title={movie.title}
                classes={{
                  root: classes.titleBar,
                  title: classes.title,
                }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
};

export default Genre;
