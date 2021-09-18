import './App.css';
import Main from '../Main/Main'
import { Route, withRouter, Switch } from 'react-router-dom'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/signup">
          Signup
        </Route>
        <Route path="/signin">
          Signin
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/">
          <Header />
          <Switch>
            <Route path="/movies">
              <Movies />
            </Route>
            <Route path="/saved-movies">
              <SavedMovies />
            </Route>
          </Switch>
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

export default withRouter(App);
