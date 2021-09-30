import React from 'react';
import './App.css';
import Main from '../Main/Main'
import { Route, withRouter, Switch } from 'react-router-dom'
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import CurrentUserContext from '../../contexts/CurrentUserContext'
import auth from '../../utils/Auth'
import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App(props) {
  // Movies
  const [cardList, setCardList] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);

  // Auth
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  function closeAllPopups() {
    //setIsEditProfilePopupOpen(false);
    //setIsRemovePopupOpen(false);
  }

  function handleSearchAllMovies(searchValue, isShort) {
    setIsSearching(true);
    setIsResult(false);
    moviesApi.getMovies()
      .then(movies => {
        console.log(movies);
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies
          .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
          .filter((m) => isShort ? m.duration <= 60 : m.duration > 60)
        if (filteredMovies?.length === 0) return setIsNotFound(true);
        setIsNotFound(false);
        setIsResult(true);
        setCardList(filteredMovies);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSearching(false))
  }

  function handleSearchMyMovies(searchValue, isShort) {
    setIsSearching(true);
    setIsResult(false);
    mainApi.getSavedMovies()
      .then(movies => {
        const regExp = new RegExp(searchValue.toLowerCase());
        const filteredMovies = movies
          .filter((movie) => regExp.test(movie.nameRU.toLowerCase()))
          .filter((m) => isShort ? m.duration <= 60 : m.duration > 60)
        if (filteredMovies?.length === 0) return setIsNotFound(true);
        setIsNotFound(false);
        setIsResult(true);
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
      .catch((err) => handleError(err))
      .finally(() => {
        //setIsLoading(false);
      })
  }

  function handleSaveMovie(data) {
    //setIsLoading(true);
    mainApi.saveMovie(data)
      .catch((err) => handleError(err))
      .finally(() => { }/*setIsLoading(false)*/)
  }

  function handleUnsaveMovie(data) {
    mainApi.unsaveMovie(data._id)
      .catch(err => handleError(err))
  }

  function handleLogin({ email, password }) {
    auth.login({ email, password })
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
        props.history.push('/movies');
      })
      .catch(err => handleError(err))
  }

  function handleLogout() {
    auth.signout()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem('token');
        mainApi.changeToken('');
        setCurrentUser(null);
        props.history.push('/signin');
      })
      .catch((err) => handleError(err))
  }

  function handleRegister({ name, email, password }) {
    auth.register({ name, email, password })
      .then(() => {
        //setLoginResult(true);
        //setIsInfoTooltipOpen(true);
        props.history.push('/signin');
      })
      .catch((err) => handleError(err))
  }

  function handleError(error) {
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
            <Main loggedIn={loggedIn} />
          </Route>
          <ProtectedRoute
            path="/profile"
            exact
            component={Profile}
            loggedIn={loggedIn}
            onUserUpdate={handleUpdateUser}
            onLogout={handleLogout}
          />
          <ProtectedRoute
            path="/movies"
            exact
            loggedIn={loggedIn}
            isResult={isResult}
            isNotFound={isNotFound}
            isSearching={isSearching}
            onSearch={handleSearchAllMovies}
            onSaveMovie={handleSaveMovie}
            onUnsaveMovie={handleUnsaveMovie}
            cardList={cardList}
          />
          <ProtectedRoute
            path="/saved-movies"
            exact
            component={SavedMovies}
            loggedIn={loggedIn}
            isResult={isResult}
            isNotFound={isNotFound}
            isSearching={isSearching}
            onSearch={handleSearchMyMovies}
            onSaveMovie={handleSaveMovie}
            onUnsaveMovie={handleUnsaveMovie}
            cardList={cardList}
          />
          <ProtectedRoute path="/" component={NotFound} />
        </Switch>
      </div>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
