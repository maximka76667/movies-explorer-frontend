import React from 'react';
import './App.css';
import Main from '../Main/Main'
import { Route, withRouter, Switch } from 'react-router-dom'
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext'
import auth from '../../utils/Auth'
import mainApi from '../../utils/MainApi';

function App(props) {
  // Movies
  const [cardList, setCardList] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);

  // Auth
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  function closeAllPopups() {
    //setIsEditProfilePopupOpen(false);
    //setIsRemovePopupOpen(false);
  }

  function handleSearch(searchValue, isShort) {
    setIsSearching(true);
    mainApi.getSavedMovies()
      .then(movies => {
        console.log(movies);
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies
          .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
          .filter((m) => isShort ? m.duration <= 60 : m.duration > 60)
        if (filteredMovies?.length === 0) return setIsNotFound(true);
        setIsNotFound(false);
        setCardList(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSearching(false))
  }

  function handleUpdateUser(data) {
    //setIsLoading(true);
    mainApi.setProfileInfo(data)
      .then((res) => {
        setCurrentUser(res.user);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        //setIsLoading(false);
      })
  }

  function handleSaveMovie(data) {
    //setIsLoading(true);
    mainApi.addMovie(data)
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => { }/*setIsLoading(false)*/)
  }

  function handleLogin({ login, password }) {
    auth.login({ login, password })
      .then((data) => {
        if (data.token) handleAuth(data.token);
      })
      .catch(err => handleError(err));
  }

  function handleAuth(token) {
    auth.getEmail(token)
      .then((res) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        // setLoginResult(true);
        // setIsInfoTooltipOpen(true);
        mainApi.changeToken(token);
        setCurrentUser(res.user);
        props.history.push('/');
      })
    //.catch(err => handleError(err))
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }

  function handleRegister({ email, password }) {
    auth.register({ email, password })
      .then(() => {
        //setLoginResult(true);
        //setIsInfoTooltipOpen(true);
        props.history.push('/signin');
      })
      .catch((err) => handleError(err))
  }

  function handleError(error) {
    //setLoginResult(false);
    //setIsInfoTooltipOpen(true);
    console.log(error);
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return handleAuth(token);
    }
  }

  React.useEffect(() => {
    handleTokenCheck();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signup" exact>
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin" exact>
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/profile" exact>
            <Profile onLogout={handleLogout} />
          </Route>
          <Route path="/movies" exact>
            <Movies onSearch={handleSearch} />
          </Route>
          <Route path="/saved-movies" exact>
            <SavedMovies onSearch={handleSearch} />
          </Route>
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
