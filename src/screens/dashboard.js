import { useState, useEffect } from "react";
import axios from "axios";
import Genre from "./../components/genre";
import Navbar from "./../components/navbar";
import SearchResults from "./../components/searchResults";

const Dashboard = () => {
  const [genreList, setGenreList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const genre_list_route = "https://api.themoviedb.org/3/genre/movie/list";
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(genre_list_route, { params: { api_key } })
      .then((response) => {
        setGenreList(response.data.genres);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderComponent = () => {
    if (searching) {
      return <SearchResults movies={movies} />;
    } else if (genreList.length) {
      return (
        <div>
          {genreList.map((genreObject) => (
            <Genre key={genreObject.id} genre={genreObject} />
          ))}
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <Navbar setSearching={setSearching} setMovies={setMovies} />
      {renderComponent()}
    </div>
  );
};

export default Dashboard;
