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
import Movies from '../Movies/Movies';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useLocation } from 'react-router';
import filter from '../../utils/filter';
import { MESSAGES } from '../../config';

function App(props) {

  const location = useLocation();

  // Auth
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Loading
  const [isLoading, setIsLoading] = React.useState(false);

  // CardList
  const [initSavedCardList, setInitSavedCardList] = React.useState([]);
  const [initCardList, setInitCardList] = React.useState([]);

  // Movies
  const [cardList, setCardList] = React.useState([]);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isResult, setIsResult] = React.useState(false);

  // Saved Movies
  const [savedMovies, setSavedMovies] = React.useState([]);

  // Profile
  const [isEdit, setIsEdit] = React.useState(false);

  // InfoTooltip
  const [resultSuccessful, setResultSuccessful] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState('');

  // Auth
  function handleLogin({ email, password }) {
    auth.login({ email, password })
      .then((data) => {
        if (data.token) handleAuth(data.token);
      })
      .catch(err => handleError(err));
  }

  function handleAuth(token) {
    const requestedPathname = location.pathname;
    auth.getEmail(token)
      .then((res) => {
        localStorage.setItem('token', token);
        setLoggedIn(true);
        handleInfo(true, MESSAGES.auth)
        mainApi.changeToken(token);
        setCurrentUser(res.user);
        if (requestedPathname === '/signin' || requestedPathname === '/signup') props.history.push('/movies')
        else props.history.push(requestedPathname);
        mainApi.getSavedMovies()
          .then((movies) => {
            const filteredMovies = movies.movies.filter((movie) => movie.owner === res.user._id);
            setSavedMovies(filteredMovies);
          })
      })
      .catch(err => handleError(err));
  }

  function handleLogout() {
    auth.signout(localStorage.getItem('token'))
      .then(() => {
        setLoggedIn(false);
        mainApi.changeToken('');
        setCurrentUser(null);
        localStorage.removeItem('token');
        props.history.push('/');
        handleInfo(true, MESSAGES.logout)
      })
      .catch((err) => handleError(err));
  }

  function handleRegister({ name, email, password }) {
    auth.register({ name, email, password })
      .then(() => {
        handleInfo(true, MESSAGES.register)
        handleLogin({ email, password });
      })
      .catch((err) => handleError(err))
  }

  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      return handleAuth(token);
    }
  }

  // Card List
  function clearCardList() {
    setIsResult(false);
  }

  // Movies
  function handleSearchAllMovies(searchValue, isShort) {
    setIsResult(false);
    if (!searchValue) return handleInfo(false, MESSAGES.searchError);
    const filteredMovies = filter(initCardList, searchValue, isShort);
    if (filteredMovies?.length === 0) return setIsNotFound(true);
    setCardList(filteredMovies);
    setIsNotFound(false);
    setIsResult(true);
  }

  // Saved Movies
  function handleInitSavedMovies() {
    setIsNotFound(false);
    setIsResult(true);
    setInitSavedCardList(savedMovies);
    setCardList(savedMovies);
  }

  // Movie Card
  function handleSaveMovie(data) {
    mainApi.saveMovie(data)
      .then((movie) => setSavedMovies([movie.movie, ...savedMovies]))
      .catch((err) => handleError(err))
  }

  function handleUnsaveMovie(id) {
    mainApi.unsaveMovie(id)
      .then((deletedCard) => {
        const newSavedMovies = savedMovies.filter((movieCard) => deletedCard.movie._id !== movieCard._id)
        setSavedMovies(newSavedMovies);
      })
      .catch(err => console.log(err))
  }

  function handleSearchMyMovies(searchValue, isShort) {
    if (!searchValue) return handleInfo(false, MESSAGES.searchError);
    if (initSavedCardList.length === 0) return setIsNotFound(true);
    const filteredMovies = filter(initSavedCardList, searchValue, isShort)
    if (filteredMovies.length === 0) return setIsNotFound(true);
    setCardList(filteredMovies);
    setIsNotFound(false);
  }

  // Profile
  function handleUpdateUser({ name, email }) {
    if (isEdit) {
      setIsLoading(true);
      mainApi.setProfileInfo({ name, email })
        .then((res) => {
          setCurrentUser(res.user);
          handleInfo(true, MESSAGES.userUpdate)
        })
        .catch((err) => {
          setCurrentUser(currentUser);
          handleError(err)
        })
        .finally(() => {
          setIsLoading(false);
          setIsEdit(false);
        })
    }
  }

  function changeIsEdit(newIsEdit) {
    setIsEdit(newIsEdit);
  }

  // Others
  function handleError(error) {
    console.log(error);
    handleInfo(false, MESSAGES.defaultError)
  }

  function handleInfo(success, message) {
    setResultSuccessful(success);
    setInfoMessage(message);
    setIsInfoTooltipOpen(true);
  }

  function handleCloseAllPopups() {
    setIsInfoTooltipOpen(false);
  }

  React.useEffect(() => {
    handleTokenCheck();

    setIsSearching(true);
    moviesApi.getMovies()
      .then(movies => {
        setInitCardList(movies);
      })
      .catch((err) => handleError(err))
      .finally(() => setIsSearching(false))

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
            isLoading={isLoading}
            changeIsEdit={changeIsEdit}
            isEdit={isEdit}
          />
          <ProtectedRoute
            path="/movies"
            exact
            component={Movies}
            loggedIn={loggedIn}
            isResult={isResult}
            isNotFound={isNotFound}
            isSearching={isSearching}
            onSearch={handleSearchAllMovies}
            onSaveMovie={handleSaveMovie}
            onUnsaveMovie={handleUnsaveMovie}
            cardList={cardList}
            savedMovies={savedMovies}
            clearCardList={clearCardList}
          />
          <ProtectedRoute
            path="/saved-movies"
            exact
            component={SavedMovies}
            loggedIn={loggedIn}
            isResult={isResult}
            isNotFound={isNotFound}
            isSearching={isSearching}
            onSaveMovie={handleSaveMovie}
            onUnsaveMovie={handleUnsaveMovie}
            cardList={cardList}
            savedMovies={savedMovies}
            initSavedMovies={handleInitSavedMovies}
            clearCardList={clearCardList}
            onSearchMyMovies={handleSearchMyMovies}
          />
          <Route path="/">
            <NotFound />
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          result={resultSuccessful}
          onClose={handleCloseAllPopups}
          message={infoMessage}
        />
      </div>
    </CurrentUserContext.Provider >
  );
}

export default withRouter(App);
