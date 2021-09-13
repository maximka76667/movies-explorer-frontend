import './App.css';
import Main from '../Main/Main'
import { Route, withRouter } from 'react-router-dom'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Main />
      </Route>
      <Route path="/movies">
        <Movies />
      </Route>
      <Route path="/saved-movies">
        <SavedMovies />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/signup">
        Signup
      </Route>
      <Route path="/signin">
        Signin
      </Route>
    </div>
  );
}

export default withRouter(App);
