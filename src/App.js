import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./screens/dashboard";
import Movie from "./screens/movie";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/movie/:movieId" component={Movie} />
        <Route render={() => <h1>404: page not found</h1>} />
      </Switch>
    </Router>
  );
};

export default App;
