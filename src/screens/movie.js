import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "black",
    minHeight: "100vh",
    display: "flex",
  },

  title: {
    color: "#ffff00",
    fontSize: "4rem",
    fontFamily: "Hallo Sans",
  },
  text: {
    color: "white",
    fontSize: "1.6rem",
    fontFamily: "Alegreya Sans",
  },
  img: {
    width: "60%",
    height: "auto",
    objectFit: "contain",
    textAlign: "center",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  details: {
    padding: 10,
    paddingRight: "15%",
  },
}));

const Movie = ({
  match: {
    params: { movieId },
  },
}) => {
  const classes = useStyles();
  const [movieData, setMovieData] = useState({});
  const [credits, setCredits] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const get_movie_route = "https://api.themoviedb.org/3/movie/";

    axios
      .all([
        axios.get(get_movie_route + movieId, {
          params: {
            api_key: api_key,
          },
        }),
        axios.get(get_movie_route + movieId + "/credits", {
          params: {
            api_key: api_key,
          },
        }),
      ])

      .then(
        axios.spread((response1, response2) => {
          setMovieData(response1.data);
          setCredits({
            cast: response2.data.cast.splice(0, 10).map((cast) => cast.name),
            director: response2.data.crew.filter(
              (crew) => crew.job === "Director"
            )[0].name,
          });
          setLoading(false);
        })
      )
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className={classes.root}>
      <Grid container alignItems="center" justifyContent="center">
        {loading ? (
          <div> Loading ...</div>
        ) : (
          <>
            <Grid item xs={5} className={classes.center}>
              <img
                src={
                  movieData.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`
                    : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEXExMRbW13JyclbW1tVVVdZWVuKiopYWFjGxsbMzMxhYWJ8fH5zc3OxsbFQUFCkpKS/v7+bm5usrKyUlJRpaWm4uLiCgoJfX19vb2+Hh4dnZ2etra2Pj4+mpqZtbW1VVVhGRkZdW/YcAAAI0ElEQVR4nO2dDZuiKhSAFTDR1DQzy6zu//+VFw5qSljNJLjPPOfd2WZr26HXw7fAeh6CIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCIMgbOHyNn45e4/B7+HsuIZxIoogQ8Wzyj/9F1EfsPiWfvCxF+t9E/FWe55Ug3e+Lomzb8/G4TU6nU/WvK47jIqXkH7zOJd3vdkVZns/CJUluh6auQwkTv8KMMXiS/jOGvIeMiCIubURcOhehcjg0cU0pY5lCiUhoSAf6Pzoz5KOcBllMxSUCRFS4zGR5lV6uV5HHyhbC0jQ+E9zlgzCR34N74Af+59Bw7yqGEBLh1JWXNE3Bpd3I4pLcbk0cU5XDQikC/MhlxjBzZciLVsXldDo0srwMeUsWF/lknLe+FnsYsqurGN5EYMIgFF8iOMpCFCYfZLpvPrz6bEg1/OGhVi8E8mu4YLKekQ/wYygriBtBvg1/F4TAryd6YafCsqGmES51Xd9OyXa72ZRlsdtdL2lV7QOnhmQb/izviY8XdDCoaYQQpXHcHG5Jsj0eN21ZFNfrPhUuuccj0hV0aCGhIruEYFi6iuHxVQwfIn0t4wuXm3I5b4TLbncBF8Gohex1ujTUo6yp5fcUcmnYujLcQAz7bMagvMhSCTnscDgliYiLCEy52+0vaQ4uude3jpwMzaUHRpPqgw8PQ4dOvKmCMhxu3BhyvmHSMBQ2NxGYM+Qx6SLzmNc19LJljB4yX6bYGR6jhRzeJViCIc1lAx+RvrCoLDV8qbfqne1fppjHytByDPtPSsoMYph2Oeoh5D3rLDAgkD3xGgwTqzF8fFBSKENnfSiReOzEcIjhDgzZ3kW5V3UpUYYn27m0K22dYbYjjxpx/H2E4aWfolI+gOHNZq6JkjoegIaPxk6A4k6SQBoe7BqGoa+NEgKb+CqpIEtlTlCGTW5RURguOEz4HJqlRHYUlaHNmZp/wNAP4j8bQ07ODJ65MGRWC98YFoxiuLmDoc3Jtt5w647k3hmKBqqFGDIHhk00mT+zSXTNHjEswfDuwtDRCM2DrtPDsFAxvNg3jNc1tNkVXtlwB9UO21lMfm1DFUObU1ErG+6DP27I94FUZOapqGUK58qGKTT4rDUNgb+cBepZ2bBShpu/bni3Odm2siFMtvnMaPg3YqgMgyQyVSt/wtBrekNrrGvoeTcwvP3Z1sLzToFIPjiQ50K3VFf1Z4ZLpDox5JB8YPMCrxxDZehT802eRcK4siE5dobGtzo3XKZkaIZwv4vZC+HPYpgv0QibDDO+VPv+zA8MSXlaIsWJYdQqQ/O1c5pLxUVOw6xd4EpPY7hRd4PMU1EuDeU9uCQIwh35OtmpYdkZfv9z5/g4l0Zy4o/W1deVrmaocmlquqfstqZRS1/qsPl2eYJmWCjDveGn8mXm+j/NpfygFtuw47f5aWq4U4ZXewuFPzEUqRO1EgVmjRaN4VW1hxanEz+KIeeXrL9DRcP0u08z7bVdIHlx2dYdH/K8Cf1BUd7t+yJxzVDFsLQ36f1RLuVH5g8ELOHfVAJTw0rF0OLavU8MyW66pI9tyBeLojRDFcOWWAviB4aQR6eK1/FCvOmb335SzRAW0bLzquUw2upruQM6d8OPt+TdJ5sa5jWswzqvOLbgpMg0QbkCxhwsUvx3jN58MKPhdpWed7fatap1Qb+eWU7IU/p+we90niZvOkPDT7MfQ5WCYfW3XGRbmiYAE7kA/kq8V5dfi+EBDJOVcqnszBTMvDaapU+1qej4SPu6etleajE8wSzGzdoA+G05rGr6nEtVHPU2sev4yGVqJJ9PcWrIE/g3h5XqUhGLWzizeYSGifbmPFY7MyjbvtpxN82lPIHl+vVaY/xuNYiRIGgnwwx+7Dvnfla+aDM0w2NnaO3GxesYVvOCsn4Yjwi6W/JdfK/zY6xpLiVQkT1neUj+azvJa8Pby1004ajh51X86BdQGs/PBWjl8LyeIfceg8I5xXgoPvw0CjelwUyX4NlQ1r8i6KZOkuUxPu8XSryCHbmqVEirXYwgmevbaOWwVYb2Nlm+yKX54Z3gsE6Ep5ke7Wyub6PFsOwN3c9E9Ws/X0MvUG0enlap0nBmzb9W0xRqc5fxzXZzKdk/dbhNhE1O5MV4KrCyb2Mc9E3vAXP1zLkhh0HhJ4uHRcNPxg3FiOBgrCq0GMJaTJhss8Ss4ZF9tBNW9GDaPJ7pum5N7bhWDvfqmb3JtplcKucxP1r/LfeM3mbqXGqsbbQYpusYEsOg8DeYipcWw86wsDZRYzTkZKEV/AFNn7pv0/aQQMfQ5kZZo2F3N+F7QVnb6ClqLX4FZThrndY0vFrgHIEO9jQDo+XSzvDsMoZqN9JS3Nto6qgZwiZLP3Rq+GpQ+Auyq1aLTQy9HMrDzGSbHUNyWXibEJ32OQfD7sUYNneZJtvsGIo2+rTwTqjwJvs2g6UylLd9YRtpv1HWXU0T6eOgr9EC9Mil6lCCRsaQntzFUIyD6IIVDRhmm9H60d6w2BXl5rhN1Hbuk6t7wNxrgmXPZgGyXaQZinYku8OGOXgSmnvpyxtyNamwOOMxfG84fYMrQ3K1s9+SjmJkNAxja9vXpoYfDgp/oci2Lw2pI8PoaCWPAsOuEXMMayeGcqy+bDU6UewGSOYYUmuTbSNDnsf2/B61zZqGFvOoJICDBXhn2J+UJVpfeaZUZm0bab9Llucz80kLwrYynyrDujuQj9G6kef9tPbLIa/s78tncozU9WlYW1wvcHgRnOpnfT1Ns+ygcI5Q1DZ9z7ta5iimjw2j0sXZCoGfcnKdjp6WOZDpreEhzxbvjBqJ82g6ArZOH0NXx2OwhFxXMbQwnphTbNcxdAksIvvThqOzTf6ooY+GaIiGaIiGixla7nEPhqcsvLMV+M9VDEl53qzC0dl/F8BJ5OqUr+mRX64E1SH67nGlZ3fs+W8mjCAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgizN/zkVpZoFkmZZAAAAAElFTkSuQmCC`
                }
                alt={movieData.title}
                className={classes.img}
              />
            </Grid>
            <Grid item xs={7} className={classes.details}>
              <Box mt={4}>
                <div className={classes.title}>{movieData.title}</div>
              </Box>
              <Box my={1}>
                <Rating
                  name="read-only"
                  value={Math.round(movieData.vote_average) / 2}
                  readOnly
                  precision={0.5}
                />
              </Box>
              <Box my={2.5}>
                <div className={classes.text}>
                  {movieData.release_date.split("-")[0]} | {movieData.runtime}{" "}
                  mins | {credits.director}
                </div>
              </Box>
              <Box my={2.5}>
                <div className={classes.text}>
                  <b>Cast</b>: {credits.cast?.map((cast) => `${cast}, `)}
                </div>
              </Box>

              <div className={classes.text}>
                <b>Movie Description:</b> {movieData.overview}
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
};

export default Movie;
